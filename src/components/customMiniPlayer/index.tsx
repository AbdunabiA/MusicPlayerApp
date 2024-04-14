import defImg from "@/assets/images/defaultMusicImg.jpg";
import NextSvg from "@/assets/icons/next";
import PrevSvg from "@/assets/icons/prev";
import PlaySvg from "@/assets/icons/play";
import PauseSvg from "@/assets/icons/pause";
import { MiniPlayerProps } from "@/types";




const CustomMiniPlayer:React.FC<MiniPlayerProps> = ({
  setMode,
  max,
  audioInstance,
  setProgress,
  progress,
  trackMetadata,
  playing,
}) => {
  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-gradient-to-b from-gray-900 to-slate-900 pb-1"
      onClick={(e: React.MouseEvent) => {
        // console.log(e.target);
        if (e.target instanceof HTMLElement && e.target?.id !== "button") {
          setMode("full");
        }
      }}
      id="canopen"
    >
      <div className="container max-w-md">
        <input
          type="range"
          className="music-range"
          max={max}
          onChange={(e) => {
            if (audioInstance?.currentTime) {
              audioInstance.currentTime = Number(e.target.value);
            }
            setProgress(Number(e.target.value));
            // console.log(e.target.value);
          }}
          value={progress}
        />
        <div className="flex items-center justify-between h-[10vh]">
          <div className="flex items-center gap-2">
            <div
              className={`w-[10vh] h-[10vh] bg-[url(${defImg})] bg-cover`}
            >
              <img
                src={trackMetadata?.cover || defImg}
                alt=""
                className="object-cover  w-full h-full"
              />
            </div>
            <div className="max-w-[110px]">
              <p className="text-lg font-bold line-clamp-1 text-gray-200">
                {trackMetadata?.name}
              </p>
              <p className="text-sm line-clamp-1 text-gray-500">
                {trackMetadata?.singer}
              </p>
            </div>
          </div>

          <div className="flex items-center h-full">
            <button
              onClick={() => {
                if (audioInstance?.playPrev) {
                  audioInstance.playPrev();
                }
              }}
              id="button"
              className="h-full"
            >
              <PrevSvg className="fill-gray-200 w-10 h-10 rotate-180" />
            </button>
            <button
              onClick={() => {
                if (audioInstance?.togglePlay) {
                  audioInstance.togglePlay();
                }
              }}
              id="button"
              className="h-full"
            >
              {playing ? (
                <PauseSvg className="fill-gray-200 w-10 h-10" />
              ) : (
                <PlaySvg className="fill-gray-200 w-10 h-10" />
              )}
            </button>
            <button
              onClick={() => {
                if (audioInstance?.playNext) {
                  audioInstance!.playNext();
                }
              }}
              id="button"
              className="h-full"
            >
              <NextSvg className="fill-gray-200 w-10 h-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMiniPlayer;
