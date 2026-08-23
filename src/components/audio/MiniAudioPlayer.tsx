import React, { useState, useEffect } from 'react';
import { ZZZ_TRACKS } from '../../data/audioTracks';
import { audioEngine, AudioMetrics } from '../../services/audioManager';
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

interface MiniAudioPlayerProps {
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const MiniAudioPlayer: React.FC<MiniAudioPlayerProps> = ({ onPlayingChange }) => {
  const [playerState, setPlayerState] = useState(audioEngine.getState());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [realtimeBands, setRealtimeBands] = useState<number[]>([15, 25, 20, 30, 22, 18, 15, 12, 10, 8]);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setPlayerState(state);
      if (onPlayingChange) {
        onPlayingChange(state.isPlaying);
      }
    });

    const handleRealtimeMetrics = (e: Event) => {
      const customEvent = e as CustomEvent<AudioMetrics>;
      if (customEvent.detail && customEvent.detail.frequencies) {
        setRealtimeBands(customEvent.detail.frequencies);
      }
    };

    window.addEventListener('realtime-audio-metrics', handleRealtimeMetrics);

    return () => {
      unsubscribe();
      window.removeEventListener('realtime-audio-metrics', handleRealtimeMetrics);
    };
  }, [onPlayingChange]);

  const { isPlaying, currentTrackIdx, currentTime, duration, volume, isMuted } = playerState;
  const currentTrack = ZZZ_TRACKS[currentTrackIdx];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
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
              {isPlaying && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </div>

            <div className="max-w-[130px] sm:max-w-[170px] truncate min-w-0">
              <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                <Radio className="h-3 w-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="truncate">{isPlaying ? 'LIVE AUDIO' : 'ZZZ OST • READY'}</span>
              </div>
              <p className="text-xs font-bold text-black dark:text-white truncate">
                {currentTrack.title}
              </p>
            </div>
          </button>

          {/* Real-time FFT Frequency Equalizer Bars */}
          <div className="hidden sm:flex items-end gap-0.5 h-4 px-2 py-0.5 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0 overflow-hidden">
            {realtimeBands.slice(0, 6).map((bandValue, i) => (
              <span
                key={i}
                className="w-1 bg-emerald-500 dark:bg-emerald-400 rounded-full transition-all duration-75"
                style={{
                  height: isPlaying ? `${Math.max(15, bandValue)}%` : '15%',
                }}
              />
            ))}
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-1 pl-1 border-l border-black/10 dark:border-white/15 flex-shrink-0">
            <button
              onClick={() => audioEngine.togglePlay()}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className={`p-2 rounded-xl transition-all cursor-pointer shadow-xs font-bold ${
                isPlaying 
                  ? 'bg-black text-white dark:bg-emerald-500 dark:text-black hover:opacity-90' 
                  : 'bg-emerald-500 text-black hover:bg-emerald-400 animate-pulse'
              }`}
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
              <span className={`h-2 w-2 rounded-full bg-emerald-500 ${isPlaying ? 'animate-ping' : ''}`} />
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
                title="Open Official Track on YouTube Music"
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
                  onClick={() => audioEngine.selectTrack(idx)}
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
              {/* Disc & Real FFT Visualizer Display */}
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

                {/* 10-Band Real FFT Audio Spectrum Visualizer */}
                <div className="flex items-end gap-1 h-7 px-2.5 py-1 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0 overflow-hidden">
                  {realtimeBands.map((val, idx) => (
                    <span
                      key={idx}
                      className="w-1 bg-emerald-500 dark:bg-emerald-400 rounded-full transition-all duration-75"
                      style={{
                        height: isPlaying ? `${Math.max(15, val)}%` : '15%',
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
                  onChange={(e) => audioEngine.seek(parseFloat(e.target.value))}
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
                {/* Volume Slider */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => audioEngine.toggleMute()}
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
                    onChange={(e) => audioEngine.setVolume(parseFloat(e.target.value))}
                    aria-label="Volume controller"
                    className="w-16 h-1 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Core Playback Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => audioEngine.prev()}
                    aria-label="Previous track"
                    className="p-2.5 rounded-xl border border-black/10 dark:border-white/15 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition-colors cursor-pointer"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => audioEngine.togglePlay()}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className={`p-3.5 rounded-2xl font-bold transition-all shadow-md cursor-pointer ${
                      isPlaying
                        ? 'bg-black text-white dark:bg-emerald-500 dark:text-black hover:opacity-90'
                        : 'bg-emerald-500 text-black hover:bg-emerald-400 animate-pulse'
                    }`}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={() => audioEngine.next()}
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
  );
};
