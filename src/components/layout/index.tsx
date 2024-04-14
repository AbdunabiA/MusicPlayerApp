import MusicPlayer from "@/components/musicPlayer"
// import { useAudioListStore } from "@/store";
import { Outlet } from "react-router-dom";
import AlertDialogCustom from "../ui/alertDialog";

const Layout: React.FC = () => {
  // const audioList = [
  //   {
  //     name: "Despacito",
  //     singer: "Luis Fonsi",
  //     cover:
  //       "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
  //     musicSrc:
  //       "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
  //   },
  //   {
  //     name: "Dorost Nemisham",
  //     singer: "Sirvan Khosravi",
  //     cover:
  //       "https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg",
  //     musicSrc:
  //       "https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3",
  //   },
  // ];
  // const changeAudioList = useAudioListStore(state => state.changeAudiList)
  
  // changeAudioList(audioList)

  return (
    <div className="bg-gradient-to-b from-sky-900 to-slate-800">
      <Outlet />
      <MusicPlayer />
      <AlertDialogCustom />
    </div>
  );
};

export default Layout;
