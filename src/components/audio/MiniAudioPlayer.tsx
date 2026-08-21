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
  Sparkles,
  ExternalLink 
} from 'lucide-react';

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  loadVideoById: (videoId: string, startSeconds?: number) => void;
  cueVideoById: (videoId: string, startSeconds?: number) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy?: () => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        config: {
          videoId: string;
          playerVars?: {
            autoplay?: number;
            controls?: number;
            disablekb?: number;
            fs?: number;
            modestbranding?: number;
            playsinline?: number;
            origin?: string;
            enablejsapi?: number;
          };
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

interface MiniAudioPlayerProps {
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const MiniAudioPlayer: React.FC<MiniAudioPlayerProps> = ({ onPlayingChange }) => {
  const [currentTrackIdx, setCurrentTrackIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(152);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const intervalRef = useRef<number | null>(null);
  const currentIdxRef = useRef<number>(currentTrackIdx);
  const isTransitioningRef = useRef<boolean>(false);

  useEffect(() => {
    currentIdxRef.current = currentTrackIdx;
  }, [currentTrackIdx]);

  useEffect(() => {
    if (onPlayingChange) {
      onPlayingChange(isPlaying);
    }
  }, [isPlaying, onPlayingChange]);

  const currentTrack: Track = ZZZ_TRACKS[currentTrackIdx];

  // Guaranteed continuous auto-advance to next song
  const advanceToNext = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const nextIdx = (currentIdxRef.current + 1) % ZZZ_TRACKS.length;
    currentIdxRef.current = nextIdx;
    setCurrentTrackIdx(nextIdx);
    setCurrentTime(0);
    setDuration(ZZZ_TRACKS[nextIdx].approxDurationSec);

    setTimeout(() => {
      if (playerRef.current) {
        try {
          playerRef.current.loadVideoById(ZZZ_TRACKS[nextIdx].youtubeId, 0);
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch {
          // Fallback
        }
      }
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 1200);
    }, 150);
  };

  // Initialize YouTube IFrame Player API with autoplay enabled
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }

      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    };

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        playerRef.current = new window.YT.Player('zzz-youtube-player-host', {
          videoId: ZZZ_TRACKS[0].youtubeId, // Starts on 60% Daily Life · Leisure
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              setIsReady(true);
              event.target.setVolume(100);
              try {
                event.target.playVideo();
                setIsPlaying(true);
              } catch {
                // Autoplay gesture fallback
              }
            },
            onStateChange: (event) => {
              if (event.data === 1) {
                // PLAYING
                setIsPlaying(true);
              } else if (event.data === 2) {
                // PAUSED
                setIsPlaying(false);
              } else if (event.data === 0) {
                // ENDED -> seamlessly auto-play next track
                advanceToNext();
              }
            },
            onError: () => {
              advanceToNext();
            }
          },
        });
      } catch {
        // Handle initialization gracefully
      }
    };

    loadYouTubeAPI();

    // Fallback: If browser blocks un-gestured autoplay, play on first user interaction
    const handleFirstInteraction = () => {
      if (playerRef.current && isReady) {
        try {
          playerRef.current.setVolume(100);
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch {
          // Ignore
        }
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true, passive: true });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Poll current time and duration when playing + end-of-track guard watchdog
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        if (playerRef.current) {
          try {
            const time = playerRef.current.getCurrentTime();
            const dur = playerRef.current.getDuration();
            if (typeof time === 'number' && !isNaN(time)) {
              setCurrentTime(time);
            }
            if (typeof dur === 'number' && !isNaN(dur) && dur > 0) {
              setDuration(dur);
              // End-of-track watchdog: if within 0.8s of the end, automatically trigger next track
              if (dur > 10 && time >= dur - 0.8 && !isTransitioningRef.current) {
                advanceToNext();
              }
            }
          } catch {
            // Ignore polling errors
          }
        }
      }, 300);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    advanceToNext();
  };

  const handlePrevTrack = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const prevIdx = (currentIdxRef.current - 1 + ZZZ_TRACKS.length) % ZZZ_TRACKS.length;
    currentIdxRef.current = prevIdx;
    setCurrentTrackIdx(prevIdx);
    setCurrentTime(0);
    setDuration(ZZZ_TRACKS[prevIdx].approxDurationSec);

    setTimeout(() => {
      if (playerRef.current && isReady) {
        playerRef.current.loadVideoById(ZZZ_TRACKS[prevIdx].youtubeId, 0);
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 1200);
    }, 150);
  };

  const selectTrack = (idx: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    currentIdxRef.current = idx;
    setCurrentTrackIdx(idx);
    setCurrentTime(0);
    setDuration(ZZZ_TRACKS[idx].approxDurationSec);

    setTimeout(() => {
      if (playerRef.current && isReady) {
        playerRef.current.loadVideoById(ZZZ_TRACKS[idx].youtubeId, 0);
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 1200);
    }, 150);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = parseFloat(e.target.value);
    setCurrentTime(target);
    if (playerRef.current && isReady) {
      playerRef.current.seekTo(target, true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (playerRef.current && isReady) {
      playerRef.current.setVolume(val * 100);
      if (val > 0) playerRef.current.unMute();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current || !isReady) return;

    if (isMuted) {
      setIsMuted(false);
      playerRef.current.unMute();
      playerRef.current.setVolume((volume || 1.0) * 100);
    } else {
      setIsMuted(true);
      playerRef.current.mute();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* Hidden YouTube Iframe Anchor */}
      <div 
        id="zzz-youtube-player-host"
        aria-hidden="true" 
        className="fixed -bottom-96 -right-96 opacity-0 pointer-events-none w-1 h-1 overflow-hidden" 
      />

      <div className="fixed bottom-6 right-6 z-50 select-none font-mono text-xs">
        {/* Mini Collapsed Bar */}
        {!isExpanded ? (
          <div className="flex items-center gap-3 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 dark:bg-[#0e1117]/95 backdrop-blur-xl border border-black/15 dark:border-white/15 shadow-xl shadow-black/10 dark:shadow-black/70 hover-lift transition-all">
            {/* Spinning Cassette/Disc */}
            <button
              onClick={() => setIsExpanded(true)}
              aria-label="Expand player"
              className="flex items-center gap-2.5 text-left group cursor-pointer min-w-0"
            >
              <div className="relative flex-shrink-0">
                <Disc3
                  className={`h-6 w-6 text-emerald-600 dark:text-emerald-400 transition-transform duration-700 ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="max-w-[130px] sm:max-w-[170px] truncate min-w-0">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                  <Radio className="h-3 w-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="truncate">ZZZ OST</span>
                </div>
                <p className="text-xs font-bold text-black dark:text-white truncate">
                  {currentTrack.title}
                </p>
              </div>
            </button>

            {/* Equalizer Frequency Bars */}
            <div className="hidden sm:flex items-end gap-0.5 h-4 px-2 py-0.5 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0 overflow-hidden">
              {[40, 80, 50, 95, 65, 30].map((_, i) => (
                <span
                  key={i}
                  className="w-1 bg-emerald-500 dark:bg-emerald-400 rounded-full transition-all duration-150"
                  style={{
                    height: isPlaying ? `${Math.min(100, Math.max(20, (Math.sin(currentTime * 5 + i) * 0.5 + 0.5) * 100))}%` : '20%',
                  }}
                />
              ))}
            </div>

            {/* Quick Controls */}
            <div className="flex items-center gap-1 pl-1 border-l border-black/10 dark:border-white/15 flex-shrink-0">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="p-2 rounded-xl bg-black text-white dark:bg-emerald-500 dark:text-black hover:opacity-90 transition-all cursor-pointer shadow-xs font-bold"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
              </button>
              <button
                onClick={() => setIsExpanded(true)}
                aria-label="Expand player console"
                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-ink-muted dark:text-slate-400 transition-colors cursor-pointer"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Full Expanded Systems Audio Console */
          <div className="w-[330px] sm:w-[380px] p-6 rounded-3xl bg-white/98 dark:bg-[#0e1117]/98 backdrop-blur-2xl border border-black/15 dark:border-white/15 shadow-2xl shadow-black/20 dark:shadow-black/80 space-y-5 animate-in fade-in zoom-in-95 duration-200 text-black dark:text-white">
            {/* Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/15">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-black dark:text-white text-xs tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>HOYO-MiX • ZZZ DECK</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <a
                  href={`https://music.youtube.com/watch?v=${currentTrack.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Listen on YouTube Music"
                  className="p-1.5 rounded-lg border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors"
                  title="Open on YouTube Music"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  aria-label="Toggle playlist"
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    showPlaylist
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400'
                  }`}
                  title="View Official Tracklist"
                >
                  <ListMusic className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  aria-label="Minimize player"
                  className="p-1.5 rounded-lg border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
                >
                  <Minimize2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Tracklist Drawer */}
            {showPlaylist ? (
              <div className="space-y-1.5 max-h-[230px] overflow-y-auto pr-1">
                <span className="text-[10px] text-ink-subtle dark:text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                  OFFICIAL HOYO-MiX SOUNDTRACK
                </span>
                {ZZZ_TRACKS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => selectTrack(idx)}
                    className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between border cursor-pointer ${
                      currentTrackIdx === idx
                        ? 'bg-black/5 dark:bg-[#161b22] border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5 text-black/80 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <span className="text-[10px] text-ink-subtle dark:text-slate-400 flex-shrink-0">0{idx + 1}</span>
                      <div className="truncate min-w-0">
                        <p className="text-xs truncate font-bold text-black dark:text-white">{t.title}</p>
                        <p className="text-[10px] text-ink-muted dark:text-slate-400 truncate">{t.chineseTitle} • {t.genre}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-ink-subtle dark:text-slate-400 flex-shrink-0 ml-2">{t.duration}</span>
                  </button>
                ))}
              </div>
            ) : (
              /* Main Player Deck */
              <div className="space-y-5">
                {/* Disc & Visualizer Display */}
                <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-[#161b22] border border-black/10 dark:border-white/10 flex items-center justify-between gap-3 overflow-hidden">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-3 rounded-2xl bg-white dark:bg-[#0e1117] border border-black/10 dark:border-white/15 shadow-sm flex-shrink-0">
                      <Disc3
                        className={`h-7 w-7 text-emerald-600 dark:text-emerald-400 transition-transform duration-700 ${
                          isPlaying ? 'animate-spin' : ''
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-black dark:text-white tracking-tight truncate">
                        {currentTrack.title}
                      </h4>
                      <p className="text-[11px] text-ink-muted dark:text-slate-400 truncate">
                        {currentTrack.artist} • <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{currentTrack.genre}</span>
                      </p>
                    </div>
                  </div>

                  {/* 10-Band Animated Graphic Equalizer */}
                  <div className="flex items-end gap-1 h-7 px-2.5 py-1 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0 overflow-hidden">
                    {[35, 75, 45, 90, 60, 85, 40, 95, 50, 70].map((baseHeight, idx) => (
                      <span
                        key={idx}
                        className="w-1 bg-emerald-500 dark:bg-emerald-400 rounded-full transition-all duration-100"
                        style={{
                          height: isPlaying
                            ? `${Math.min(100, Math.max(15, (Math.sin((currentTime * 8) + idx) * 0.5 + 0.5) * baseHeight))}%`
                            : '20%',
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
                    max={duration || currentTrack.approxDurationSec}
                    value={currentTime}
                    onChange={handleSeek}
                    aria-label="Seek track position"
                    className="w-full h-1.5 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-ink-subtle dark:text-slate-400 font-medium">
                    <span>{formatTime(currentTime)}</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>

                {/* Deck Playback Controls */}
                <div className="flex items-center justify-between pt-1">
                  {/* Volume Slider (default 100%) */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      aria-label="Toggle mute"
                      className="text-ink-muted dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="h-4 w-4 text-rose-500" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolume}
                      aria-label="Volume controller"
                      className="w-16 h-1 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>

                  {/* Core Playback Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevTrack}
                      aria-label="Previous track"
                      className="p-2.5 rounded-xl border border-black/10 dark:border-white/15 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition-colors cursor-pointer"
                    >
                      <SkipBack className="h-4 w-4" />
                    </button>

                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                      className="p-3.5 rounded-2xl bg-black text-white dark:bg-emerald-500 dark:text-black font-bold hover:opacity-90 transition-all shadow-md cursor-pointer"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                    </button>

                    <button
                      onClick={handleNextTrack}
                      aria-label="Next track"
                      className="p-2.5 rounded-xl border border-black/10 dark:border-white/15 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition-colors cursor-pointer"
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
    </>
  );
};
