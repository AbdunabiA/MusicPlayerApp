import { useAudioInstanceStore, useAudioListStore, useCurrentAudio } from '@/store';
import defImg from "@/assets/images/defaultMusicImg.jpg";
import { LoadingSpinner } from '../ui/loadingSpinner';

const AudioListRender = () => {
      const audioList = useAudioListStore((state) => state.audioList);
      const currentAudio = useCurrentAudio(state => state.audio)
      const audioInstance = useAudioInstanceStore(
        (state) => state.audioInstance
      );
      const loading = useCurrentAudio(state => state.loading)
      const playingIndex = useCurrentAudio(state=>state.audioIndex)
    // console.log("audioList", audioList);
  return (
    <>
      {audioList?.map((track, i) => {
        return (
          <div
            className={`flex items-center gap-4 overflow-hidden rounded-sm p-2 relative ${
              loading && playingIndex === i
                ? "bg-slate-900 opacity-50"
                : ""
            } ${
              playingIndex === i && track.name === currentAudio?.name
                ? "bg-slate-900"
                : ""
            }`}
            key={track.key}
            onClick={() => {
              console.log("index", i);
              console.log("loading", loading);
              
              if (audioInstance?.playByIndex) audioInstance.playByIndex(i);
            }}
          >
            
            {loading && playingIndex === i ? <LoadingSpinner className="absolute left-[48%] top-[48%] stroke-gray-200" /> : null}
            
            <div className={`w-[10vh] h-[10vh] bg-[url(${defImg})] bg-cover`}>
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