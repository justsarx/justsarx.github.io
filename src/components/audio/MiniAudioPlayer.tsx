import React, { useState, useEffect, useRef } from 'react';
import { ZZZ_TRACKS, Track } from '../../data/audioTracks';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Disc3, 
  Maximize2, 
  Minimize2, 
  Radio, 
  ListMusic, 
  Sparkles 
} from 'lucide-react';

export const MiniAudioPlayer: React.FC = () => {
  const [currentTrackIdx, setCurrentTrackIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(165);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [synthMode, setSynthMode] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  const currentTrack: Track = ZZZ_TRACKS[currentTrackIdx];

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.src = currentTrack.src;
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      } else {
        setCurrentTime((prev) => (prev + 0.25) % 165);
      }
    };

    const onEnded = () => {
      handleNextTrack();
    };

    const onError = () => {
      // If network audio stream fails, enable Web Audio API synthesized beat
      setSynthMode(true);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [currentTrackIdx]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      stopSynth();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setSynthMode(false);
          })
          .catch(() => {
            // Autoplay restriction or network fallback: trigger synthesized chords
            startSynth();
            setIsPlaying(true);
            setSynthMode(true);
          });
      }
    }
  };

  // Web Audio API Synthesizer Fallback (generates chill retro ZZZ chords)
  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23], // G7
      ];
      let step = 0;

      synthIntervalRef.current = window.setInterval(() => {
        if (!audioCtxRef.current || !isPlaying) return;
        const currentChord = chords[step % chords.length];
        step++;

        currentChord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.015 * (isMuted ? 0 : volume), ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 1.9);
        });
      }, 2000);
    } catch {
      // Ignore web audio errors
    }
  };

  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const handleNextTrack = () => {
    setCurrentTrackIdx((prev) => (prev + 1) % ZZZ_TRACKS.length);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => startSynth());
      }
    }, 100);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIdx((prev) => (prev - 1 + ZZZ_TRACKS.length) % ZZZ_TRACKS.length);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => startSynth());
      }
    }, 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = parseFloat(e.target.value);
    setCurrentTime(target);
    if (audioRef.current) {
      audioRef.current.currentTime = target;
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.7;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none font-mono text-xs">
      {/* Mini Collapsed Bar */}
      {!isExpanded ? (
        <div className="flex items-center gap-3 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-white/90 dark:bg-[#12151b]/95 backdrop-blur-xl border border-black/15 dark:border-white/15 shadow-xl shadow-black/10 dark:shadow-black/60 hover-lift transition-all">
          {/* Spinning Cassette/Disc */}
          <button
            onClick={() => setIsExpanded(true)}
            aria-label="Expand player"
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="relative">
              <Disc3
                className={`h-6 w-6 text-emerald-600 dark:text-emerald-400 transition-transform duration-700 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
              />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="max-w-[130px] sm:max-w-[170px] truncate">
              <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                <Radio className="h-3 w-3" />
                <span>ZZZ FM</span>
                {synthMode && <span className="text-[8px] text-amber-500 font-normal">[SYNTH]</span>}
              </div>
              <p className="text-xs font-bold text-black dark:text-white truncate">
                {currentTrack.title}
              </p>
            </div>
          </button>

          {/* Equalizer Frequency Bars */}
          <div className="hidden sm:flex items-end gap-0.5 h-4 px-1">
            {[40, 80, 50, 95, 65, 30].map((_, i) => (
              <span
                key={i}
                className="w-1 bg-emerald-500 rounded-full transition-all duration-150"
                style={{
                  height: isPlaying ? `${(Math.sin(currentTime * 5 + i) * 0.5 + 0.5) * 100}%` : '20%',
                }}
              />
            ))}
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-1 pl-1 border-l border-black/10 dark:border-white/10">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="p-2 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-all cursor-pointer shadow-xs"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
            </button>
            <button
              onClick={() => setIsExpanded(true)}
              aria-label="Expand player console"
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-ink-muted dark:text-textMuted transition-colors cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Full Expanded Systems Audio Console */
        <div className="w-[330px] sm:w-[380px] p-6 rounded-3xl bg-white/95 dark:bg-[#12151b]/98 backdrop-blur-2xl border border-black/15 dark:border-white/20 shadow-2xl shadow-black/20 dark:shadow-black/70 space-y-5 animate-in fade-in zoom-in-95 duration-200">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-black dark:text-white text-xs tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                <span>NEW ERIDU AUDIO DECK</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                aria-label="Toggle playlist"
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  showPlaylist
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-slate-400'
                }`}
                title="View Tracklist"
              >
                <ListMusic className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                aria-label="Minimize player"
                className="p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 transition-colors cursor-pointer"
              >
                <Minimize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Tracklist Drawer */}
          {showPlaylist ? (
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              <span className="text-[10px] text-ink-subtle uppercase tracking-wider block mb-2 font-bold">
                ZENLESS ZONE ZERO SOUNDTRACK
              </span>
              {ZZZ_TRACKS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setCurrentTrackIdx(idx);
                    setIsPlaying(true);
                    setTimeout(() => audioRef.current?.play().catch(() => startSynth()), 50);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between border cursor-pointer ${
                    currentTrackIdx === idx
                      ? 'bg-black/5 dark:bg-white/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5 text-black/80 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px] text-ink-subtle">0{idx + 1}</span>
                    <div className="truncate">
                      <p className="text-xs truncate">{t.title}</p>
                      <p className="text-[10px] text-ink-muted dark:text-textMuted">{t.genre}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-ink-subtle">{t.duration}</span>
                </button>
              ))}
            </div>
          ) : (
            /* Main Player Deck */
            <div className="space-y-5">
              {/* Disc & Visualizer Display */}
              <div className="p-4 rounded-2xl bg-black/5 dark:bg-[#0c0e12] border border-black/10 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white dark:bg-surface border border-black/10 dark:border-white/10 shadow-sm">
                    <Disc3
                      className={`h-8 w-8 text-emerald-600 dark:text-emerald-400 transition-transform duration-700 ${
                        isPlaying ? 'animate-spin' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black dark:text-white tracking-tight">
                      {currentTrack.title}
                    </h4>
                    <p className="text-[11px] text-ink-muted dark:text-textMuted">
                      {currentTrack.artist} • <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{currentTrack.bpm} BPM</span>
                    </p>
                  </div>
                </div>

                {/* 10-Band Animated Graphic Equalizer */}
                <div className="flex items-end gap-1 h-8">
                  {[30, 70, 45, 90, 60, 85, 40, 95, 50, 75].map((baseHeight, idx) => (
                    <span
                      key={idx}
                      className="w-1 bg-emerald-500/80 rounded-full transition-all duration-100"
                      style={{
                        height: isPlaying
                          ? `${Math.max(15, (Math.sin((currentTime * 8) + idx) * 0.5 + 0.5) * baseHeight)}%`
                          : '15%',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Progress & Scrubber */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  min={0}
                  max={duration || 165}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Seek track position"
                  className="w-full h-1.5 bg-black/10 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-ink-subtle">
                  <span>{formatTime(currentTime)}</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Deck Playback Controls */}
              <div className="flex items-center justify-between pt-1">
                {/* Volume Slider */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    aria-label="Toggle mute"
                    className="text-ink-muted dark:text-textMuted hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolume}
                    aria-label="Volume controller"
                    className="w-16 h-1 bg-black/10 dark:bg-white/15 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Core Playback Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevTrack}
                    aria-label="Previous track"
                    className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition-colors cursor-pointer"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>

                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="p-3.5 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold hover:opacity-90 transition-all shadow-md cursor-pointer"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={handleNextTrack}
                    aria-label="Next track"
                    className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition-colors cursor-pointer"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
