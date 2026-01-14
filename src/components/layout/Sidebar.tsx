import { NavLink } from '@/components/NavLink';
import { Home, Search, Library, PlusCircle, Heart, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Music2 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Melodify</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 space-y-1">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent"
          activeClassName="bg-accent text-accent-foreground"
        >
          <Home className="h-5 w-5" />
          Home
        </NavLink>
        <NavLink
          to="/search"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent"
          activeClassName="bg-accent text-accent-foreground"
        >
          <Search className="h-5 w-5" />
          Search
        </NavLink>
        <NavLink
          to="/library"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent"
          activeClassName="bg-accent text-accent-foreground"
        >
          <Library className="h-5 w-5" />
          Your Library
        </NavLink>
      </nav>

      <Separator className="my-4" />

      {/* Playlists Section */}
      <div className="px-3 space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-3 px-3">
          <PlusCircle className="h-5 w-5" />
          Create Playlist
        </Button>
        <NavLink
          to="/liked"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent"
          activeClassName="bg-accent text-accent-foreground"
        >
          <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Heart className="h-3 w-3 text-white" />
          </div>
          Liked Songs
        </NavLink>
      </div>

      <Separator className="my-4" />

      {/* Playlist List */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 pb-4">
          <p className="px-3 text-xs text-muted-foreground">
            Your playlists will appear here
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};
