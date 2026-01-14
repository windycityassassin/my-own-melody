import { usePlayer } from '@/contexts/PlayerContext';
import { Music } from 'lucide-react';

export const NowPlaying = () => {
  const { currentTrack } = usePlayer();

  return (
    <div className="flex items-center gap-4 min-w-0">
      <div className="w-14 h-14 rounded-md bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
        {currentTrack?.albumArt ? (
          <img 
            src={currentTrack.albumArt} 
            alt={currentTrack.album}
            className="w-full h-full object-cover"
          />
        ) : (
          <Music className="w-6 h-6 text-muted-foreground" />
        )}
      </div>
      
      <div className="min-w-0 flex-1">
        {currentTrack ? (
          <>
            <p className="font-medium text-sm truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            No track playing
          </p>
        )}
      </div>
    </div>
  );
};
