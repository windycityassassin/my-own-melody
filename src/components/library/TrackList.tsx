import { Track } from '@/types/music';
import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackListProps {
  tracks: Track[];
  showAlbum?: boolean;
}

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const TrackList = ({ tracks, showAlbum = true }: TrackListProps) => {
  const { currentTrack, isPlaying, playPlaylist, toggle } = usePlayer();

  const handleTrackClick = (index: number) => {
    if (currentTrack?.id === tracks[index].id) {
      toggle();
    } else {
      playPlaylist(tracks, index);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
        <div className="w-8">#</div>
        <div>Title</div>
        {showAlbum && <div>Album</div>}
        <div className="w-16 text-right">Duration</div>
      </div>

      {/* Tracks */}
      <div className="divide-y divide-border/50">
        {tracks.map((track, index) => {
          const isCurrentTrack = currentTrack?.id === track.id;
          
          return (
            <div
              key={track.id}
              className={cn(
                "grid gap-4 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer group",
                showAlbum ? "grid-cols-[auto_1fr_1fr_auto]" : "grid-cols-[auto_1fr_auto]"
              )}
              onClick={() => handleTrackClick(index)}
            >
              {/* Track number / Play button */}
              <div className="w-8 flex items-center justify-center">
                <span className={cn(
                  "group-hover:hidden",
                  isCurrentTrack && "text-primary"
                )}>
                  {isCurrentTrack && isPlaying ? (
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="flex gap-0.5">
                        <div className="w-1 h-3 bg-primary animate-pulse" />
                        <div className="w-1 h-3 bg-primary animate-pulse delay-75" />
                        <div className="w-1 h-3 bg-primary animate-pulse delay-150" />
                      </div>
                    </div>
                  ) : (
                    index + 1
                  )}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hidden group-hover:flex"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTrackClick(index);
                  }}
                >
                  {isCurrentTrack && isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Title & Artist */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                  {track.albumArt ? (
                    <img 
                      src={track.albumArt} 
                      alt={track.album}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Music className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className={cn(
                    "font-medium truncate",
                    isCurrentTrack && "text-primary"
                  )}>
                    {track.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {track.artist}
                  </p>
                </div>
              </div>

              {/* Album */}
              {showAlbum && (
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground truncate">
                    {track.album}
                  </span>
                </div>
              )}

              {/* Duration & More */}
              <div className="w-16 flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {formatDuration(track.duration)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
