import ReactJkMusicPlayer from "react-jinke-music-player";
import music1 from "@/assets/music/2Pac, Big Syke – All Eyez On Me (Dj Belite Remix).mp3";
import music2 from "@/assets/music/Adam – Zhurek Isko Alvarez remix.mp3";
import music3 from "@/assets/music/Ed Sheeran – Shape of You.mp3";
import music4 from "@/assets/music/Eminem – Mockingbird.mp3";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const music = [
  {
    musicSrc: music1,
    name: "first",
    singer: "2Pac, Big Syke",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
    remove: false,
  },
  {
    musicSrc: music2,
    name: "second",
    singer: "Adam",
    cover:
      "https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg",
    remove: false,
  },
  {
    musicSrc: music3,
    name: "third",
    singer: "Ed Sheeran",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg",
    remove: false,
  },
  {
    musicSrc: music4,
    name: "fourth",
    singer: "Eminem",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
    remove: false,
  },
];

const Home = () => {
  const [mode, setMode] = useState<string>("mini");
  const [progress, setProgress] = useState<{ current: number; all: number }>({
    current: 0,
    all: 0,
  });
  console.log(mode);

  return (
    <div className="container max-w-sm border-2 border-black relative">
      <Button onClick={() => setMode("full")}>Shad cn</Button>
      <ReactJkMusicPlayer
        mode={mode === "mini" ? "mini" : "full"}
        quietUpdate
        audioLists={music}
        responsive={true}
        autoHiddenCover={true}
        drag={false}
        autoPlay={false}
        showDownload={false}
        onModeChange={(mode) => setMode(mode)}
        onAudioPlay={(audioplay) => console.log("audioPLay", audioplay)}
        onAudioPlayTrackChange={(trackChange) =>
          console.log("trackChange", trackChange)
        }
        getAudioInstance={(AudioINstace) => {
          this.audioInstance = AudioINstace;
          console.log("AudioINstace", AudioINstace, this.audioInstance);
        }}
        onAudioProgress={(audioProgress) => {
          setProgress({
            current: audioProgress.currentTime,
            all: audioProgress.duration,
          });
          //   console.log("audioProgress", audioProgress);
        }}
        // showRemove={false}
      />
      {mode === "mini" ? (
        <div>
          <Slider value={[progress.current]} max={progress.all} step={4} />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
