import { useAudioInstanceStore, useAudioListStore } from '@/store';
import defImg from "@/assets/images/defaultMusicImg.jpg";

const AudioListRender = () => {
      const audioList = useAudioListStore((state) => state.audioList);
      const audioInstance = useAudioInstanceStore(
        (state) => state.audioInstance
      );

    // console.log("audioList", audioList);
  return (
    <>
      {audioList?.map((track, i) => {
        return (
          <div
            className="flex items-center gap-4 h-8"
            key={track.key}
            onClick={() => {
              console.log("index", i);

              if (audioInstance?.playByIndex) audioInstance.playByIndex(i);
            }}
          >
            <div className={`w-[8vh] h-[8vh] bg-[url(${defImg})] bg-cover`}>
              <img
                src={track.cover || defImg}
                alt=""
                className="object-cover  w-full h-full"
              />
            </div>
            <div className="max-w-[200px]">
              <p className="text-lg font-bold line-clamp-1 text-gray-200">
                {track?.name}
              </p>
              <p className="text-sm line-clamp-1 text-gray-500">
                {track?.singer}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AudioListRender