import React, { useEffect, useRef } from 'react';

interface DynamicScrollBackgroundProps {
  isPlaying?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  alpha: number;
  frequencyBand: number; // 0: bass, 1: mid, 2: treble
  phase: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export const DynamicScrollBackground: React.FC<DynamicScrollBackgroundProps> = ({ isPlaying = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPlayingRef = useRef<boolean>(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Initialize physics particles
    const numParticles = 48;
    const particles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseX: x,
        baseY: y,
        size: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.4 + 0.25,
        frequencyBand: i % 3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const shockwaves: Shockwave[] = [];
    let lastKickTime = 0;
    let time = 0;

    // Audio envelope follower state
    let smoothBass = 0;
    let smoothMid = 0;
    let smoothTreble = 0;

    const render = () => {
      time += 0.02;
      scrollY += (targetScrollY - scrollY) * 0.08;

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains('dark');
      const playing = isPlayingRef.current;

      // Realistic audio frequency multi-band synthesis
      let targetBass = 0;
      let targetMid = 0;
      let targetTreble = 0;

      if (playing) {
        // Multi-frequency harmonic superposition for ZZZ electronic breakbeat & lo-fi groove
        const kickInterval = 1.35; // ~89 BPM beat cadence
        const kickPhase = (time % kickInterval) / kickInterval;
        const kickImpact = Math.max(0, Math.exp(-kickPhase * 6) * Math.sin(kickPhase * Math.PI * 8));

        targetBass = kickImpact * 1.4 + Math.sin(time * 3.2) * 0.2 + 0.3;
        targetMid = Math.abs(Math.sin(time * 6.5) * Math.cos(time * 2.1)) * 0.8 + 0.2;
        targetTreble = Math.abs(Math.sin(time * 12.0) * Math.sin(time * 4.3)) * 0.9 + 0.15;

        // Spawn a soundwave ripple on beat peaks
        if (kickImpact > 0.85 && time - lastKickTime > 0.8) {
          lastKickTime = time;
          shockwaves.push({
            x: w / 2 + (Math.random() - 0.5) * 200,
            y: h / 2 + (Math.random() - 0.5) * 150,
            radius: 10,
            maxRadius: Math.min(w, h) * 0.45,
            alpha: 0.25,
            speed: 3.5,
          });
        }
      }

      // Smooth attack/decay envelope
      smoothBass += (targetBass - smoothBass) * 0.18;
      smoothMid += (targetMid - smoothMid) * 0.22;
      smoothTreble += (targetTreble - smoothTreble) * 0.3;

      const primaryEmerald = isDark ? '16, 185, 129' : '5, 150, 105';
      const baseInk = isDark ? '255, 255, 255' : '16, 24, 40';

      // 1. Draw Architectural Grid Crosshairs with Harmonic Breathing
      const gridSize = 160;
      const offsetX = (mouseX * 0.02) % gridSize;
      const offsetY = ((scrollY * 0.15) + (mouseY * 0.02)) % gridSize;
      const crossSize = 5 + (playing ? smoothBass * 3.5 : 0);

      const crosshairAlpha = isDark
        ? 0.04 + (playing ? smoothMid * 0.04 : 0)
        : 0.035 + (playing ? smoothMid * 0.03 : 0);

      ctx.strokeStyle = `rgba(${baseInk}, ${crosshairAlpha})`;
      ctx.lineWidth = 1;

      for (let x = offsetX - gridSize; x < w + gridSize; x += gridSize) {
        for (let y = offsetY - gridSize; y < h + gridSize; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
          ctx.stroke();
        }
      }

      // 2. Render & Update Shockwave Soundwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;
        sw.alpha *= 0.96;

        if (sw.alpha < 0.005 || sw.radius > sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${primaryEmerald}, ${sw.alpha * (isDark ? 0.35 : 0.25)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 3. Update & Draw Particles with Multi-Band Audio Physics
      particles.forEach((p, idx) => {
        let bandEnergy = 0;
        if (p.frequencyBand === 0) bandEnergy = smoothBass; // Bass
        else if (p.frequencyBand === 1) bandEnergy = smoothMid; // Mid
        else bandEnergy = smoothTreble; // Treble

        // Apply audio velocity impulses
        if (playing) {
          const angle = p.phase + time * (p.frequencyBand === 0 ? 1 : 2.5);
          p.x += Math.cos(angle) * (bandEnergy * 1.6);
          p.y += Math.sin(angle) * (bandEnergy * 1.6) - 0.2;

          // Gentle mouse repulsion
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 0) {
            p.x += (dx / dist) * 1.2;
            p.y += (dy / dist) * 1.2;
          }
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Screen wrap
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Dynamic size & alpha modulation based on audio
        const currentSize = p.size * (playing ? 1 + bandEnergy * 0.9 : 1);
        const currentAlpha = Math.min(1, p.alpha * (playing ? 1 + bandEnergy * 0.8 : 0.7));

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = playing
          ? `rgba(${primaryEmerald}, ${currentAlpha * 0.75})`
          : `rgba(${baseInk}, ${currentAlpha * 0.45})`;
        ctx.fill();

        // 4. Constellation Node Links (Connect nearby particles when audio energy surges)
        if (playing && smoothMid > 0.35) {
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const ndx = p.x - p2.x;
            const ndy = p.y - p2.y;
            const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

            const maxDist = 130 + smoothBass * 40;
            if (nDist < maxDist) {
              const linkAlpha = (1 - nDist / maxDist) * smoothMid * 0.22;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${primaryEmerald}, ${linkAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      });

      // 5. Ambient Flowing Audio Spectrum Ribbon Wave (Bottom/Center)
      if (playing) {
        ctx.beginPath();
        const waveY = h * 0.65;
        const waveSegments = 40;
        const segWidth = w / waveSegments;

        ctx.moveTo(0, waveY);
        for (let i = 0; i <= waveSegments; i++) {
          const wx = i * segWidth;
          const waveHeight =
            Math.sin(i * 0.35 + time * 4.0) * (smoothBass * 28) +
            Math.cos(i * 0.7 + time * 7.5) * (smoothMid * 16) +
            Math.sin(i * 1.2 + time * 11.0) * (smoothTreble * 8);

          ctx.lineTo(wx, waveY + waveHeight);
        }

        ctx.strokeStyle = isDark
          ? `rgba(16, 185, 129, ${0.06 + smoothBass * 0.06})`
          : `rgba(5, 150, 105, ${0.05 + smoothBass * 0.05})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full transition-opacity duration-700 ${
        isPlaying ? 'opacity-95' : 'opacity-60'
      }`}
    />
  );
};
