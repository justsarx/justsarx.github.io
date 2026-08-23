import { ZZZ_TRACKS, Track } from '../data/audioTracks';

export interface AudioMetrics {
  bass: number;
  mid: number;
  treble: number;
  energy: number;
  frequencies: number[]; // 10 normalized bands (0 to 100)
  isKick: boolean;
}

type AudioListener = (state: {
  isPlaying: boolean;
  currentTrackIdx: number;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isReady: boolean;
}) => void;

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;

  private currentTrackIdx: number = 0;
  private isPlaying: boolean = false;
  private volume: number = 1.0;
  private isMuted: boolean = false;
  private isReady: boolean = false;
  private isAudioCtxInitialized: boolean = false;

  private listeners: Set<AudioListener> = new Set();
  private animFrameId: number | null = null;
  private lastKickTime: number = 0;
  private freqData: Uint8Array<ArrayBuffer> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
      this.setupGlobalUnlock();

      // Immediate attempt on cold load
      setTimeout(() => {
        this.play().catch(() => {});
      }, 100);
    }
  }

  private initAudioElement() {
    this.audio = new Audio();
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'auto';
    this.audio.volume = this.volume;
    this.audio.src = ZZZ_TRACKS[this.currentTrackIdx].src;

    this.audio.addEventListener('loadedmetadata', () => {
      this.isReady = true;
      this.notifyListeners();
      // Try autoplay when metadata is ready
      if (!this.isPlaying) {
        this.play().catch(() => {});
      }
    });

    this.audio.addEventListener('canplay', () => {
      if (!this.isPlaying) {
        this.play().catch(() => {});
      }
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.startMetricsLoop();
      this.notifyListeners();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notifyListeners();
    });

    this.audio.addEventListener('timeupdate', () => {
      this.notifyListeners();
    });

    this.audio.addEventListener('ended', () => {
      this.next();
    });

    this.audio.addEventListener('error', () => {
      setTimeout(() => this.next(), 500);
    });
  }

  private initWebAudio() {
    if (this.isAudioCtxInitialized || !this.audio || typeof window === 'undefined') return;

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      this.audioCtx = new AudioCtxClass();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = this.isMuted ? 0 : this.volume;

      this.sourceNode = this.audioCtx.createMediaElementSource(this.audio);
      this.sourceNode.connect(this.analyser);
      this.analyser.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
      this.isAudioCtxInitialized = true;
    } catch {
      // Fallback: standard audio playback without WebAudio graph
    }
  }

  private setupGlobalUnlock() {
    const triggerAutoUnlock = async () => {
      if (this.isPlaying) {
        cleanup();
        return;
      }

      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        try {
          await this.audioCtx.resume();
        } catch {}
      }

      if (this.audio) {
        try {
          await this.play();
          cleanup();
        } catch {
          // Keep listeners active until successful interaction
        }
      }
    };

    const events = [
      'pointerdown',
      'touchstart',
      'touchend',
      'mousedown',
      'mouseup',
      'click',
      'scroll',
      'wheel',
      'mousemove',
      'keydown',
      'focus',
    ];

    const cleanup = () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, triggerAutoUnlock);
      });
    };

    events.forEach((ev) => {
      window.addEventListener(ev, triggerAutoUnlock, { passive: true });
    });
  }

  private startMetricsLoop() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

    const updateMetrics = () => {
      if (!this.isPlaying) return;

      let bass = 0;
      let mid = 0;
      let treble = 0;
      let energy = 0;
      const bands: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let isKick = false;

      if (this.analyser && this.freqData) {
        this.analyser.getByteFrequencyData(this.freqData);
        const len = this.freqData.length;

        // Sub-bass (bins 0-3)
        let bassSum = 0;
        for (let i = 0; i < 4 && i < len; i++) bassSum += this.freqData[i];
        bass = (bassSum / (4 * 255));

        // Mid range (bins 4-15)
        let midSum = 0;
        for (let i = 4; i < 16 && i < len; i++) midSum += this.freqData[i];
        mid = (midSum / (12 * 255));

        // Treble range (bins 16-31)
        let trebleSum = 0;
        for (let i = 16; i < 32 && i < len; i++) trebleSum += this.freqData[i];
        treble = (trebleSum / (16 * 255));

        // Total energy
        energy = (bass * 0.5 + mid * 0.35 + treble * 0.15);

        // 10 bands for visualizer
        const step = Math.max(1, Math.floor(len / 10));
        for (let b = 0; b < 10; b++) {
          const idx = Math.min(len - 1, b * step);
          bands[b] = Math.min(100, Math.round((this.freqData[idx] / 255) * 100));
        }

        // Kick detection with cooldown
        const now = performance.now();
        if (bass > 0.65 && (now - this.lastKickTime > 320)) {
          isKick = true;
          this.lastKickTime = now;
        }
      }

      // Broadcast real metrics to background canvas and UI
      window.dispatchEvent(
        new CustomEvent<AudioMetrics>('realtime-audio-metrics', {
          detail: {
            bass,
            mid,
            treble,
            energy,
            frequencies: bands,
            isKick,
          },
        })
      );

      this.animFrameId = requestAnimationFrame(updateMetrics);
    };

    this.animFrameId = requestAnimationFrame(updateMetrics);
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrackIdx: this.currentTrackIdx,
      currentTime: this.audio?.currentTime || 0,
      duration: this.audio?.duration && !isNaN(this.audio.duration) 
        ? this.audio.duration 
        : ZZZ_TRACKS[this.currentTrackIdx].approxDurationSec,
      volume: this.volume,
      isMuted: this.isMuted,
      isReady: this.isReady,
    };
  }

  public async play(): Promise<void> {
    if (!this.audio) return;
    this.initWebAudio();

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      try {
        await this.audioCtx.resume();
      } catch {}
    }

    try {
      await this.audio.play();
    } catch (err) {
      // Browser autoplay policy rejected cold unmuted playback
      throw err;
    }
  }

  public pause(): void {
    if (!this.audio) return;
    this.audio.pause();
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play().catch(() => {});
    }
  }

  public selectTrack(idx: number): void {
    if (!this.audio) return;
    this.currentTrackIdx = (idx + ZZZ_TRACKS.length) % ZZZ_TRACKS.length;
    this.audio.src = ZZZ_TRACKS[this.currentTrackIdx].src;
    this.audio.currentTime = 0;
    this.play().catch(() => {});
    this.notifyListeners();
  }

  public next(): void {
    this.selectTrack(this.currentTrackIdx + 1);
  }

  public prev(): void {
    this.selectTrack(this.currentTrackIdx - 1);
  }

  public seek(seconds: number): void {
    if (!this.audio) return;
    this.audio.currentTime = seconds;
    this.notifyListeners();
  }

  public setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audio) this.audio.volume = this.isMuted ? 0 : this.volume;
    if (this.gainNode) this.gainNode.gain.value = this.isMuted ? 0 : this.volume;
    this.isMuted = this.volume === 0;
    this.notifyListeners();
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.audio) this.audio.volume = this.isMuted ? 0 : this.volume;
    if (this.gainNode) this.gainNode.gain.value = this.isMuted ? 0 : this.volume;
    this.notifyListeners();
  }

  public getCurrentTrack(): Track {
    return ZZZ_TRACKS[this.currentTrackIdx];
  }
}

export const audioEngine = new AudioManager();
