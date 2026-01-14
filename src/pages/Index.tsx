import { MainLayout } from '@/components/layout/MainLayout';
import { TrackList } from '@/components/library/TrackList';
import { sampleTracks } from '@/data/sampleTracks';
import { Button } from '@/components/ui/button';
import { Play, Clock } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';

const Index = () => {
  const { playPlaylist } = usePlayer();

  const handlePlayAll = () => {
    playPlaylist(sampleTracks, 0);
  };

  const totalDuration = sampleTracks.reduce((acc, track) => acc + track.duration, 0);
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/20 to-background p-8">
        <div className="flex items-end gap-6">
          <div className="w-48 h-48 bg-gradient-to-br from-primary to-primary/50 rounded-lg shadow-xl flex items-center justify-center">
            <span className="text-6xl">🎵</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Playlist
            </p>
            <h1 className="text-5xl font-bold mt-2 mb-4">
              All Songs
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{sampleTracks.length} songs</span>
              <span>•</span>
              <Clock className="h-4 w-4" />
              <span>
                {hours > 0 && `${hours} hr `}{minutes} min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 py-6 flex items-center gap-4">
        <Button 
          size="lg" 
          className="rounded-full h-14 w-14"
          onClick={handlePlayAll}
        >
          <Play className="h-6 w-6 ml-1" />
        </Button>
      </div>

      {/* Track List */}
      <div className="px-4">
        <TrackList tracks={sampleTracks} />
      </div>
    </MainLayout>
  );
};

export default Index;
