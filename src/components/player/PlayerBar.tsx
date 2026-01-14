import { NowPlaying } from './NowPlaying';
import { PlayerControls } from './PlayerControls';
import { VolumeControl } from './VolumeControl';

export const PlayerBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t border-border px-4">
      <div className="flex items-center justify-between h-full max-w-screen-2xl mx-auto">
        <NowPlaying />
        <PlayerControls />
        <VolumeControl />
      </div>
    </div>
  );
};
