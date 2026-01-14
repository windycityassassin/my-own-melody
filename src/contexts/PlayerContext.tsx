import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { Track, RepeatMode, PlayerState } from '@/types/music';

interface PlayerContextType extends PlayerState {
  play: (track?: Track) => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  setRepeat: (mode: RepeatMode) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  playPlaylist: (tracks: Track[], startIndex?: number) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeatState] = useState<RepeatMode>('off');
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(-1);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        next();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Update repeat handler when repeat mode changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        next();
      }
    };

    audio.removeEventListener('ended', handleEnded);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeat, queueIndex, queue, shuffle]);

  const play = useCallback((track?: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (track) {
      setCurrentTrack(track);
      audio.src = track.url;
      audio.play();
      setIsPlaying(true);
    } else if (currentTrack) {
      audio.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const getNextIndex = useCallback(() => {
    if (queue.length === 0) return -1;
    
    if (shuffle) {
      const availableIndices = queue
        .map((_, i) => i)
        .filter(i => i !== queueIndex);
      if (availableIndices.length === 0) return repeat === 'all' ? Math.floor(Math.random() * queue.length) : -1;
      return availableIndices[Math.floor(Math.random() * availableIndices.length)];
    }
    
    const nextIdx = queueIndex + 1;
    if (nextIdx >= queue.length) {
      return repeat === 'all' ? 0 : -1;
    }
    return nextIdx;
  }, [queue, queueIndex, shuffle, repeat]);

  const next = useCallback(() => {
    const nextIdx = getNextIndex();
    if (nextIdx !== -1 && queue[nextIdx]) {
      setQueueIndex(nextIdx);
      play(queue[nextIdx]);
    } else {
      pause();
      setProgress(0);
    }
  }, [getNextIndex, queue, play, pause]);

  const previous = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // If more than 3 seconds in, restart current track
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    const prevIdx = queueIndex - 1;
    if (prevIdx >= 0 && queue[prevIdx]) {
      setQueueIndex(prevIdx);
      play(queue[prevIdx]);
    }
  }, [queueIndex, queue, play]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clampedVol = Math.max(0, Math.min(1, vol));
    setVolumeState(clampedVol);
    if (audioRef.current) {
      audioRef.current.volume = clampedVol;
    }
  }, []);

  const toggleShuffle = useCallback(() => {
    setShuffle(prev => !prev);
  }, []);

  const setRepeat = useCallback((mode: RepeatMode) => {
    setRepeatState(mode);
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setQueue(prev => [...prev, track]);
  }, []);

  const removeFromQueue = useCallback((index: number) => {
    setQueue(prev => prev.filter((_, i) => i !== index));
    if (index < queueIndex) {
      setQueueIndex(prev => prev - 1);
    }
  }, [queueIndex]);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setQueueIndex(-1);
  }, []);

  const playPlaylist = useCallback((tracks: Track[], startIndex = 0) => {
    setQueue(tracks);
    setQueueIndex(startIndex);
    if (tracks[startIndex]) {
      play(tracks[startIndex]);
    }
  }, [play]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        progress,
        duration,
        shuffle,
        repeat,
        queue,
        queueIndex,
        play,
        pause,
        toggle,
        next,
        previous,
        seek,
        setVolume,
        toggleShuffle,
        setRepeat,
        addToQueue,
        removeFromQueue,
        clearQueue,
        playPlaylist,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
