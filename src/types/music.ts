export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  albumArt?: string;
  url: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  createdAt: Date;
}

export type RepeatMode = 'off' | 'one' | 'all';

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  shuffle: boolean;
  repeat: RepeatMode;
  queue: Track[];
  queueIndex: number;
}
