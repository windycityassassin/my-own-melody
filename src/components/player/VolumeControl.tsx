import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Volume2, Volume1, VolumeX, ListMusic } from 'lucide-react';

export const VolumeControl = () => {
  const { volume, setVolume } = usePlayer();

  const VolumeIcon = volume === 0 
    ? VolumeX 
    : volume < 0.5 
      ? Volume1 
      : Volume2;

  const toggleMute = () => {
    setVolume(volume === 0 ? 0.7 : 0);
  };

  return (
    <div className="flex items-center gap-2 justify-end min-w-[180px]">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <ListMusic className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        onClick={toggleMute}
      >
        <VolumeIcon className="h-4 w-4" />
      </Button>
      
      <Slider
        value={[volume * 100]}
        max={100}
        step={1}
        className="w-24"
        onValueChange={([value]) => setVolume(value / 100)}
      />
    </div>
  );
};
