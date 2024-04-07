import "react-jinke-music-player";

declare module "react-jinke-music-player" {
    interface ReactJkMusicPlayerInstance {
        playPrev: () => void;
        togglePlay: () => void;
        playNext: () => void;
    }
}