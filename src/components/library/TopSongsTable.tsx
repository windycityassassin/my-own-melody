import { useState, useMemo } from 'react';
import { Track } from '@/types/music';
import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Play, Pause, Search, ArrowUpDown, ExternalLink, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TopSongsTableProps {
  tracks: Track[];
}

type SortField = 'rank' | 'title' | 'artist' | 'album' | 'popularity' | 'duration' | 'releaseDate';
type SortDirection = 'asc' | 'desc';

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const TopSongsTable = ({ tracks }: TopSongsTableProps) => {
  const { currentTrack, isPlaying, playPlaylist, toggle } = usePlayer();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedTracks = useMemo(() => {
    let result = [...tracks];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(track =>
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.album.toLowerCase().includes(query) ||
        track.isrc.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      const aIndex = tracks.indexOf(a);
      const bIndex = tracks.indexOf(b);
      
      let comparison = 0;
      switch (sortField) {
        case 'rank':
          comparison = aIndex - bIndex;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'artist':
          comparison = a.artist.localeCompare(b.artist);
          break;
        case 'album':
          comparison = a.album.localeCompare(b.album);
          break;
        case 'popularity':
          comparison = a.popularity - b.popularity;
          break;
        case 'duration':
          comparison = a.duration - b.duration;
          break;
        case 'releaseDate':
          comparison = a.releaseDate.localeCompare(b.releaseDate);
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [tracks, searchQuery, sortField, sortDirection]);

  const handleTrackClick = (track: Track) => {
    const trackIndex = tracks.findIndex(t => t.id === track.id);
    if (currentTrack?.id === track.id) {
      toggle();
    } else {
      playPlaylist(tracks, trackIndex);
    }
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={cn(
          "h-3 w-3 ml-1",
          sortField === field ? "text-primary" : "text-muted-foreground/50"
        )} />
      </div>
    </TableHead>
  );

  return (
    <div className="w-full space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by track, artist, album, or ISRC..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredAndSortedTracks.length} of {tracks.length} tracks
      </p>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <SortableHeader field="rank">#</SortableHeader>
              <SortableHeader field="title">Track</SortableHeader>
              <SortableHeader field="artist">Artist(s)</SortableHeader>
              <SortableHeader field="album">Album</SortableHeader>
              <SortableHeader field="popularity">Pop.</SortableHeader>
              <SortableHeader field="duration">Duration</SortableHeader>
              <TableHead className="text-center">Archived</TableHead>
              <TableHead className="text-center">E</TableHead>
              <SortableHeader field="releaseDate">Release</SortableHeader>
              <TableHead>Type</TableHead>
              <TableHead>ISRC</TableHead>
              <TableHead className="text-center">Copies</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTracks.map((track) => {
              const originalIndex = tracks.findIndex(t => t.id === track.id);
              const isCurrentTrack = currentTrack?.id === track.id;

              return (
                <TableRow 
                  key={track.id}
                  className={cn(
                    "cursor-pointer transition-colors group",
                    isCurrentTrack && "bg-primary/10"
                  )}
                  onClick={() => handleTrackClick(track)}
                >
                  {/* Rank */}
                  <TableCell className="w-12">
                    <div className="flex items-center justify-center">
                      <span className="group-hover:hidden">
                        {isCurrentTrack && isPlaying ? (
                          <div className="flex gap-0.5">
                            <div className="w-0.5 h-3 bg-primary animate-pulse" />
                            <div className="w-0.5 h-3 bg-primary animate-pulse delay-75" />
                            <div className="w-0.5 h-3 bg-primary animate-pulse delay-150" />
                          </div>
                        ) : (
                          <span className={cn(isCurrentTrack && "text-primary font-medium")}>
                            {originalIndex + 1}
                          </span>
                        )}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hidden group-hover:flex"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrackClick(track);
                        }}
                      >
                        {isCurrentTrack && isPlaying ? (
                          <Pause className="h-3 w-3" />
                        ) : (
                          <Play className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </TableCell>

                  {/* Track */}
                  <TableCell className="max-w-[200px]">
                    <div className="flex flex-col">
                      <span className={cn(
                        "font-medium truncate",
                        isCurrentTrack && "text-primary"
                      )}>
                        {track.title}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {track.id}
                      </span>
                    </div>
                  </TableCell>

                  {/* Artists */}
                  <TableCell className="max-w-[180px]">
                    <div className="flex flex-col gap-0.5">
                      {track.artists.map((artist, idx) => (
                        <span key={artist.id} className="text-sm truncate">
                          {artist.name}
                          {idx < track.artists.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </TableCell>

                  {/* Album */}
                  <TableCell className="max-w-[180px]">
                    <div className="flex flex-col">
                      <span className="truncate">{track.album}</span>
                      <span className="text-xs text-muted-foreground truncate">
                        {track.albumId}
                      </span>
                    </div>
                  </TableCell>

                  {/* Popularity */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${track.popularity}%` }}
                        />
                      </div>
                      <span className="text-sm tabular-nums">{track.popularity}</span>
                    </div>
                  </TableCell>

                  {/* Duration */}
                  <TableCell className="tabular-nums text-sm">
                    {formatDuration(track.duration)}
                  </TableCell>

                  {/* Archived */}
                  <TableCell className="text-center">
                    {track.archived ? (
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>

                  {/* Explicit */}
                  <TableCell className="text-center">
                    {track.explicit && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        E
                      </Badge>
                    )}
                  </TableCell>

                  {/* Release Date */}
                  <TableCell className="text-sm tabular-nums whitespace-nowrap">
                    {track.releaseDate}
                  </TableCell>

                  {/* Type */}
                  <TableCell>
                    <Badge variant="outline" className="text-xs capitalize">
                      {track.albumType}
                    </Badge>
                  </TableCell>

                  {/* ISRC */}
                  <TableCell className="font-mono text-xs">
                    {track.isrc}
                  </TableCell>

                  {/* Copies */}
                  <TableCell className="text-center tabular-nums">
                    {track.copies.length}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
