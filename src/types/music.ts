export interface Artist {
  name: string;
  id: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  artists: Artist[];
  album: string;
  albumId: string;
  albumType: string;
  duration: number; // in seconds
  durationMs: number;
  popularity: number;
  explicit: boolean;
  releaseDate: string;
  isrc: string;
  copies: string[];
  archived: boolean;
  albumArt?: string;
  url?: string;
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
