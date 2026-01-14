import { MainLayout } from '@/components/layout/MainLayout';
import { top10kTracks } from '@/data/top10kTracks';
import { Library as LibraryIcon, Disc, User, Music2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Library = () => {
  // Calculate stats from tracks
  const uniqueArtists = new Set(top10kTracks.flatMap(t => t.artists.map(a => a.id))).size;
  const uniqueAlbums = new Set(top10kTracks.map(t => t.albumId)).size;
  const totalDuration = top10kTracks.reduce((acc, t) => acc + t.duration, 0);
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  return (
    <MainLayout>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <LibraryIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Your Library</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Music2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{top10kTracks.length.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Songs</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{uniqueArtists.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Artists</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Disc className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{uniqueAlbums.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Albums</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-muted-foreground">
          Total listening time: {hours} hours {minutes} minutes
        </p>

        <div className="mt-8 p-8 border border-dashed rounded-lg text-center">
          <p className="text-muted-foreground">
            Your playlists and liked songs will appear here.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Library;
