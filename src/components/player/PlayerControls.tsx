import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const PlayerControls = () => {
  const { 
    isPlaying, 
    toggle, 
    next, 
    previous, 
    shuffle, 
    toggleShuffle,
    repeat,
    setRepeat,
    progress,
    duration,
    seek,
    currentTrack
  } = usePlayer();

  const handleRepeatClick = () => {
    const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeat(modes[nextIndex]);
  };

  const RepeatIcon = repeat === 'one' ? Repeat1 : Repeat;

  return (
    <div className="flex flex-col items-center gap-2 flex-1 max-w-[722px]">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            shuffle && "text-primary"
          )}
          onClick={toggleShuffle}
        >
          <Shuffle className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={previous}
          disabled={!currentTrack}
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant="default"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={toggle}
          disabled={!currentTrack}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={next}
          disabled={!currentTrack}
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            repeat !== 'off' && "text-primary"
          )}
          onClick={handleRepeatClick}
        >
          <RepeatIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 w-full">
        <span className="text-xs text-muted-foreground w-10 text-right">
          {formatTime(progress)}
        </span>
        <Slider
          value={[progress]}
          max={duration || 100}
          step={1}
          className="flex-1"
          onValueChange={([value]) => seek(value)}
          disabled={!currentTrack}
        />
        <span className="text-xs text-muted-foreground w-10">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};
