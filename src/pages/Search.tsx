import { MainLayout } from '@/components/layout/MainLayout';
import { TopSongsTable } from '@/components/library/TopSongsTable';
import { top10kTracks } from '@/data/top10kTracks';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <MainLayout>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <SearchIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Search</h1>
        </div>
        
        <TopSongsTable tracks={top10kTracks} />
      </div>
    </MainLayout>
  );
};

export default Search;
