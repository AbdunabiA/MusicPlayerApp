import ReactJkMusicPlayer, {
  ReactJkMusicPlayerAudioListProps,
  ReactJkMusicPlayerInstance,
} from "react-jinke-music-player";
import { useRef, useState } from "react";
import { TrackMetadata } from "@/types";
import CustomMiniPlayer from "../customMiniPlayer";
import { useAudioInstanceStore, useAudioListStore, useDialogStore } from "@/store";
import { fetchMusicUrl } from "@/api";


const MusicPlayer: React.FC = () => {
  const [mode, setMode] = useState<string>("mini");
  const [progress, setProgress] = useState<number>(0);
  const [trackMetadata, setTrackMetadata] = useState<TrackMetadata>();
  const [playing, setPlaying] = useState<boolean>(false);
  const audioList = useAudioListStore(state => state.audioList)
  const changeAudioList = useAudioListStore(state => state.changeAudioList)
  const changeAudioInstance = useAudioInstanceStore(state => state.changeAudioInstance)
  const audioInstance = useAudioInstanceStore(state => state.audioInstance)
  const setIndex = useDialogStore(state => state.setIndex)
  const max = useRef(0);
  // const [audioInstance, setAudioInstance] =
  //   useState<ReactJkMusicPlayerInstance | null>(null);

  // console.log("instace", audioInstance);

  function getInstance(audioInfo: ReactJkMusicPlayerInstance) {
    changeAudioInstance(audioInfo);
  }
  return (
    <div>
      <ReactJkMusicPlayer
        mode={mode === "mini" ? "mini" : "full"}
        preload={true}
        glassBg={true}
        showPlay={true}
        quietUpdate={true}
        audioLists={audioList}
        responsive={true}
        remember={true}
        spaceBar={true}
        loadAudioErrorPlayNext={false}
        autoHiddenCover={true}
        onBeforeAudioDownload={async (audioInfo) => {
          console.log("before download", audioInfo);
          if (audioInfo.musicSrc.length > 10)
            return { ...audioInfo, src: audioInfo.musicSrc };
          const newUrl = await fetchMusicUrl(audioInfo.musicSrc);
          if (newUrl) return { ...audioInfo, src: newUrl };
          return { ...audioInfo, src: audioInfo.musicSrc };
        }}
        // onAudioListsChange={(currentPlayId, audioLists, audioInfo) => {
        //   console.log("listChange", currentPlayId, audioLists, audioInfo);
        // }}
        clearPriorAudioLists={true}
        onAudioError={async (error, currentPlayId, audioLists, audioInfo) => {
          console.log(error, currentPlayId, audioLists);
          
          if (audioInfo.musicSrc.length > 10) {
            let id = 0
            audioList.forEach((audio, i) => {
            if (audio.name === audioInfo.name) {
              id = i+1;
            }})
            setIndex(id)
            return;
          }
          const newUrl = await fetchMusicUrl(audioInfo.musicSrc);
          let id = 0;
          const newAudioList = await audioList.map((audio, i) => {
            if (audio.name === audioInfo.name && newUrl) {
              id = i;
              return { ...audio, musicSrc: newUrl };
            }
            return audio;
          });
          await changeAudioList(newAudioList);
          if (audioInstance?.playByIndex) audioInstance.playByIndex(id);
        }}
        onAudioPause={() => setPlaying(false)}
        drag={false}
        autoPlay={false}
        showDownload={false}
        onAudioReload={(info) => {
          console.log("reload", info);
        }}
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
        // onAudioPlayTrackChange={(trackChange) =>
        //   console.log("trackChange", trackChange)
        // }
        getAudioInstance={getInstance}
        onAudioProgress={(audioProgress) => {
          setProgress(audioProgress.currentTime);
          max.current = audioProgress.duration;
        }}
      />
      
      {mode === "mini" ? (
        <CustomMiniPlayer
          setMode={setMode}
          max={max.current}
          audioInstance={audioInstance}
          setProgress={setProgress}
          progress={progress}
          trackMetadata={trackMetadata}
          playing={playing}
        />
      ) : null}
    </div>
  );
}

export default MusicPlayer;
