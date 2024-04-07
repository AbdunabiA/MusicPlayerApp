import ReactJkMusicPlayer, {
  ReactJkMusicPlayerAudioListProps,
  ReactJkMusicPlayerInstance,
} from "react-jinke-music-player";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import defImg from "@/assets/images/defaultMusicImg.jpg"
import NextSvg from "@/assets/icons/next";
import PrevSvg from "@/assets/icons/prev";
import PlaySvg from "@/assets/icons/play";
import PauseSvg from "@/assets/icons/pause";

const audioList = [
  {
    name: "Despacito",
    singer: "Luis Fonsi",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
    musicSrc:
      "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
    // support async fetch music src. eg.
    // musicSrc: async () => {
    //   return await fetch('/api')
    // },
  },
  {
    name: "Dorost Nemisham",
    singer: "Sirvan Khosravi",
    cover:
      "https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg",
    musicSrc:
      "https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3",
  },
];

interface TrackMetadata {
  cover?: string | React.ReactNode;
  name?: string | React.ReactNode;
  singer?: string | React.ReactNode;
  // Add any other properties you use in your audio lists
}

const Home = () => {
  const [mode, setMode] = useState<string>("mini");
  const [progress, setProgress] = useState<number>(0);
  const [trackMetadata, setTrackMetadata] = useState<TrackMetadata>();
  const [playing, setPlaying] = useState<boolean>(false)
  
  const max = useRef(0)
  const [audioInstance, setAudioInstance] =
    useState<ReactJkMusicPlayerInstance | null>(null);

  console.log('instace',audioInstance);


  function getInstance(audioInfo: ReactJkMusicPlayerInstance) {
    setAudioInstance(audioInfo);
  }

  return (
    <div className="container max-w-sm border-2 border-black">
      <Button onClick={() => setMode("full")}>Shad cn</Button>
      <ReactJkMusicPlayer
        mode={mode === "mini" ? "mini" : "full"}
        quietUpdate
        audioLists={audioList}
        responsive={true}
        autoHiddenCover={true}
        onAudioPause={() => setPlaying(false)}
        drag={false}
        autoPlay={false}
        showDownload={false}
        onModeChange={(mode) => setMode(mode)}
        onAudioPlay={(audioInfo: ReactJkMusicPlayerAudioListProps) => {
          setTrackMetadata({
            cover: audioInfo.cover,
            name: audioInfo.name,
            singer: audioInfo.singer,
          });
          setPlaying(true);
          console.log("audioPLay", audioInfo);
        }}
        onAudioPlayTrackChange={(trackChange) =>
          console.log("trackChange", trackChange)
        }
        getAudioInstance={getInstance}
        onAudioProgress={(audioProgress) => {
          setProgress(audioProgress.currentTime);
          max.current = audioProgress.duration;
          //   console.log("audioProgress", audioProgress);
        }}
        // showRemove={false}
      />
      {mode === "mini" ? (
        <div
          className="absolute bottom-0 left-0 w-full"
          onClick={(e) => {
            console.log(e.target.id);
            if (e.target?.id !== "button") {
              setMode("full");
            }
          }}
          id="canopen"
        >
          <input
            type="range"
            className="music-range"
            max={max.current}
            // defaultValue={progress.current[0]}
            onChange={(e) => {
              // currentTime.current = Number(e.target.value);
              if (audioInstance?.currentTime) {
                audioInstance.currentTime = Number(e.target.value);
              }
              setProgress(Number(e.target.value));
              console.log(e.target.value);
            }}
            // min={0}
            value={progress}
          />
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-16 h-16 border-2 border-blue-500">
                <img
                  src={defImg}
                  alt=""
                  className="object-cover  w-full h-full"
                />
              </div>
              <div className="max-w-[110px]">
                <p className="text-lg font-bold line-clamp-1">
                  {trackMetadata?.name}
                </p>
                <p className="text-sm line-clamp-1">{trackMetadata?.singer}</p>
              </div>
            </div>

            <div className="flex items-center h-full">
              <button
                onClick={() => {
                  if (audioInstance) {
                    audioInstance!.playPrev();
                  }
                }}
                id="button"
                className="h-full"
              >
                <PrevSvg className="fill-black w-10 h-10 rotate-180" />
              </button>
              <button
                onClick={() => {
                  if (audioInstance) {
                    audioInstance!.togglePlay();
                  }
                }}
                id="button"
                className="h-full"
              >
                {playing ? (
                  <PauseSvg className="fill-black w-10 h-10" />
                ) : (
                  <PlaySvg className="fill-black w-10 h-10" />
                )}
              </button>
              <button
                onClick={() => {
                  if (audioInstance) {
                    audioInstance!.playNext();
                  }
                }}
                id="button"
                className="border-2 h-full"
              >
                <NextSvg className="fill-black w-10 h-10" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
