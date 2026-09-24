'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, Sparkles, CloudRain, Bell, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { LottieAnimation } from '@/components/ui/lottie-animation';

type SoundTrack = 'bowl' | 'rain' | 'lofi';

export function AmbientFocusPlayer({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SoundTrack>('bowl');
  const [volume, setVolume] = useState(0.45);
  const timerMinutes = 15;
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<AudioNode[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopAudioNodes = useCallback(() => {
    activeNodesRef.current.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // Audio node cleanup
      }
    });
    activeNodesRef.current = [];
  }, []);

  const pauseAudio = useCallback(() => {
    stopAudioNodes();
    setIsPlaying(false);
    setIsTimerRunning(false);
  }, [stopAudioNodes]);

  // Initialize Web Audio API Synthesizer
  const startAudio = useCallback((trackToPlay: SoundTrack = currentTrack) => {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous sounds
      stopAudioNodes();

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(volume * 0.25, ctx.currentTime);
      mainGain.connect(ctx.destination);
      gainNodeRef.current = mainGain;

      if (trackToPlay === 'bowl') {
        // 432 Hz Sweet Singing Chime Harmonics
        const frequencies = [432, 864, 1296, 216];
        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.15 + idx * 0.05, ctx.currentTime);
          lfoGain.gain.setValueAtTime(2.5, ctx.currentTime);
          lfo.connect(osc.frequency);
          lfo.start();

          oscGain.gain.setValueAtTime(0.3 / (idx + 1), ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(mainGain);
          osc.start();

          activeNodesRef.current.push(osc, lfo, oscGain, lfoGain);
        });
      } else if (trackToPlay === 'rain') {
        // Soft rainfall noise generator with low-pass filter
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.95 * b1 + white * 0.04;
          b2 = 0.85 * b2 + white * 0.03;
          output[i] = (b0 + b1 + b2) * 0.5;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(mainGain);
        whiteNoise.start();

        activeNodesRef.current.push(whiteNoise, filter);
      } else {
        // Warm Gentle Study Drone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(110, ctx.currentTime);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(220, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(mainGain);

        osc1.start();
        osc2.start();

        activeNodesRef.current.push(osc1, osc2, filter);
      }

      setIsPlaying(true);
      setIsTimerRunning(true);
    } catch (e) {
      console.error('Audio synthesis failed:', e);
    }
  }, [currentTrack, stopAudioNodes, volume]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      startAudio(currentTrack);
    }
  };

  const handleTrackChange = (track: SoundTrack) => {
    setCurrentTrack(track);
    if (isPlaying) {
      startAudio(track);
    }
  };

  // Adjust volume live
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        volume * 0.25,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume]);

  // Timer countdown
  useEffect(() => {
    if (isTimerRunning && isPlaying) {
      timerIntervalRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            pauseAudio();
            return timerMinutes * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, isPlaying, timerMinutes, pauseAudio]);

  useEffect(() => {
    return () => {
      stopAudioNodes();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, [stopAudioNodes]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  const tracks: { id: SoundTrack; label: string; icon: React.ElementType; emoji: string }[] = [
    { id: 'bowl', label: 'Magic Bell', icon: Bell, emoji: '🔔' },
    { id: 'rain', label: 'Cozy Rain', icon: CloudRain, emoji: '🌧️' },
    { id: 'lofi', label: 'Cute Lo-Fi', icon: Music, emoji: '🎧' },
  ];

  return (
    <div
      className={`relative bg-gradient-to-br from-[#FFFDF9] to-[#FFF5F7] border-2 border-[#FF6B8B]/20 p-4 sm:p-5 rounded-3xl shadow-[0_8px_24px_rgba(255,107,139,0.12)] transition-all ${className || ''}`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-2xl bg-[#FFE5EC] border border-[#FF6B8B]/30 text-[#FF6B8B] flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-[#382A2C] leading-tight flex items-center gap-1">
              Cozy Study Space 🌸
            </h4>
            <span className="text-[10px] font-semibold text-[#8E797B] block">
              {isPlaying ? '✨ Playing sweet ambient vibes' : 'Soft study focus sounds'}
            </span>
          </div>
        </div>

        {/* Cute Timer Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#FF6B8B]/20 text-[11px] font-mono font-bold text-[#FF6B8B] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#FF6B8B] animate-ping" />
          <span>{formatTime(secondsRemaining)}</span>
        </div>
      </div>

      {/* Cute Track Switcher */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FFE8ED]/50 border border-[#FF6B8B]/10 rounded-2xl mb-3">
        {tracks.map((t) => {
          const isSelected = currentTrack === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleTrackChange(t.id)}
              className={`relative flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'text-[#FF6B8B]'
                  : 'text-[#8E797B] hover:text-[#382A2C]'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCuteTrackPill"
                  className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_6px_rgba(255,107,139,0.15)] -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span>{t.emoji}</span>
              <span className="truncate">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cute Controls & Cute Flower Animation */}
      <div className="flex items-center justify-between gap-3 pt-1">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B8B] hover:bg-[#FA5274] text-white text-xs font-extrabold transition-all shadow-[0_3px_0_#E04D6D] cursor-pointer active:translate-y-0.5 active:shadow-none"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause Music</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              <span>Play Cute Beats</span>
            </>
          )}
        </button>

        {/* Dynamic Lottie Study Companion */}
        <div className="w-12 h-12 rounded-2xl bg-white/90 border border-[#FF6B8B]/25 shadow-xs p-1 shrink-0 flex items-center justify-center">
          <LottieAnimation
            src={
              currentTrack === 'lofi'
                ? '/animation/Tomato plant.json'
                : currentTrack === 'rain'
                ? '/animation/Liquid Water Drop.json'
                : '/animation/Yoga lotus flower.json'
            }
            speed={0.65}
            width={40}
            height={40}
          />
        </div>

        {/* Cute Volume Slider */}
        <div className="flex items-center gap-2 flex-1 max-w-[120px]">
          <Volume2 className="w-3.5 h-3.5 text-[#FF6B8B] shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#FFE4EC] rounded-lg appearance-none cursor-pointer accent-[#FF6B8B]"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
