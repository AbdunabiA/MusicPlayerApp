import ReactJkMusicPlayer, {
  ReactJkMusicPlayerAudioListProps,
  ReactJkMusicPlayerInstance,
} from "react-jinke-music-player";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import defImg from "@/assets/images/defaultMusicImg.jpg"

const audioList1 = [
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
  
  const max = useRef(0)
  const [audioInstance, setAudioInstance] =
    useState<ReactJkMusicPlayerInstance | null>(null);

  console.log(audioInstance?.currentTime);
  function getInstance(audioInfo: ReactJkMusicPlayerInstance) {
    setAudioInstance(audioInfo);
    // setTrackMetadata({
    //   cover: audioInfo.cover,
    //   name: audioInfo.name,
    //   singer: audioInfo.singer,
    // });
    // AudioINstace.currentTime = progress
    // console.log('instance curr time',AudioINstace.currentTime);

    // this.audioInstance = AudioINstace;
    // console.log("AudioINstace", AudioINstace, this.audioInstance);
  }

  return (
    <div className="container max-w-sm border-2 border-black relative">
      <Button onClick={() => setMode("full")}>Shad cn</Button>
      <ReactJkMusicPlayer
        mode={mode === "mini" ? "mini" : "full"}
        quietUpdate
        audioLists={audioList1}
        responsive={true}
        autoHiddenCover={true}
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
        <div>
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
          <div>
            <div>
              <img src={defImg} alt="" />
            </div>
            <div>
                <p>{trackMetadata?.singer}</p>
                <p>{trackMetadata?.name}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
