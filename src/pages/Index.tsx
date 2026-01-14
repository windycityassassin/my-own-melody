import { MainLayout } from '@/components/layout/MainLayout';
import { TopSongsTable } from '@/components/library/TopSongsTable';
import { top10kTracks } from '@/data/top10kTracks';
import { Button } from '@/components/ui/button';
import { Play, Database } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';

const Index = () => {
  const { playPlaylist } = usePlayer();

  const handlePlayAll = () => {
    playPlaylist(top10kTracks, 0);
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/20 to-background p-8">
        <div className="flex items-end gap-6">
          <div className="w-48 h-48 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg shadow-xl flex items-center justify-center">
            <Database className="h-20 w-20 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Spotify Archive
            </p>
            <h1 className="text-5xl font-bold mt-2 mb-4">
              Top 10,000 Songs
            </h1>
            <p className="text-muted-foreground mb-4">
              The most popular songs from the Spotify backup dataset, ranked by popularity score.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{top10kTracks.length} songs loaded</span>
              <span>•</span>
              <span>Full dataset: 10,000 tracks</span>
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
        <div className="text-sm text-muted-foreground">
          Click any row to play • Data from Anna's Archive Spotify backup
        </div>
      </div>

      {/* Table */}
      <div className="px-8 pb-8">
        <TopSongsTable tracks={top10kTracks} />
      </div>
    </MainLayout>
  );
};

export default Index;
