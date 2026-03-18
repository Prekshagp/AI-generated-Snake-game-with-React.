import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';

const TRACKS = [
  { id: 1, title: 'Bengaluru Neon Nights', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Mysuru Palace Synth', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Hampi Ruins Chillwave', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
  const prevTrack = () => setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-gray-900 border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)] rounded-xl p-4 w-full max-w-md mx-auto mt-6">
      <audio
        ref={audioRef}
        src={TRACKS[currentTrack].url}
        onEnded={nextTrack}
        loop={false}
      />
      <div className="text-center mb-4">
        <h3 className="text-pink-400 font-mono text-sm uppercase tracking-widest drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]">
          Now Playing
        </h3>
        <p className="text-cyan-300 font-bold text-lg drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
          {TRACKS[currentTrack].title}
        </p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <button onClick={prevTrack} className="text-cyan-400 hover:text-cyan-200 transition-colors drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">
          <SkipBack size={24} />
        </button>
        <button onClick={togglePlay} className="bg-pink-500 text-gray-900 p-3 rounded-full hover:bg-pink-400 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.6)]">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={nextTrack} className="text-cyan-400 hover:text-cyan-200 transition-colors drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">
          <SkipForward size={24} />
        </button>
        <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors ml-4">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </div>
  );
}
