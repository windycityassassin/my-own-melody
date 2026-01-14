import { Sidebar } from './Sidebar';
import { PlayerBar } from '@/components/player/PlayerBar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <ScrollArea className="flex-1">
          <main className="pb-24">
            {children}
          </main>
        </ScrollArea>
      </div>
      <PlayerBar />
    </div>
  );
};
