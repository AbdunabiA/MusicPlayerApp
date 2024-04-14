import { ReactJkMusicPlayerAudioListProps, ReactJkMusicPlayerInstance } from "react-jinke-music-player";

export interface TrackMetadata {
    cover?: string;
    name?: string | React.ReactNode;
    singer?: string | React.ReactNode;
    musicSrc?: string | React.ReactNode;
    // Add any other properties you use in your audio lists
}

export interface AudioList {
    audioList: ReactJkMusicPlayerAudioListProps[] | []
}

export interface MiniPlayerProps {
    setMode: (mode: string) => void;
    max: number;
    audioInstance: ReactJkMusicPlayerInstance | null;
    setProgress: (progress: number) => void;
    progress: number;
    trackMetadata: TrackMetadata | undefined;
    playing: boolean;
}

export interface TopMusic{
    key:string;
    title:string;
    preview:string;
    artists_id:string[];
}

export interface AudioListState {
    audioList: ReactJkMusicPlayerAudioListProps[] | []
    changeAudioList: (to: ReactJkMusicPlayerAudioListProps[]) => void
}

export interface AudioInstanceState {
    audioInstance: ReactJkMusicPlayerInstance | null
    changeAudioInstance: (to: ReactJkMusicPlayerInstance) => void
}

export interface DialogProps {
    isOpen: boolean;
    onOpen:()=>void;
    onClose:()=>void;
    playIndex:number;
    setIndex:(index:number) => void;
}

export interface CurrentAudioState {
    audioIndex: number;
    playing: boolean;
    setIndex: (index:number) => void;
    setPlaying: (playing:boolean) => void;
    audio: ReactJkMusicPlayerAudioListProps | null;
    setAudio: (audio: ReactJkMusicPlayerAudioListProps) => void;
}