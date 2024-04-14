import { create } from 'zustand'
import { AudioInstanceState, AudioListState, CurrentAudioState, DialogProps } from './types'



export const useAudioListStore = create<AudioListState>((set) => ({
    audioList: [],
    changeAudioList: (to) => set(() => ({ audioList: to })),
}))

export const useAudioInstanceStore = create<AudioInstanceState>((set)=>({
    audioInstance:null,
    changeAudioInstance: (to) => set(() => ({ audioInstance: to })),
}))

export const useDialogStore = create<DialogProps>((set)=>({
    isOpen: true,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
    playIndex:0,
    setIndex: (index) => set({ isOpen:true,playIndex:index})
}))

export const useCurrentAudio = create<CurrentAudioState>((set) => ({
    audioIndex:0,
    playing:false,
    setIndex: (index) => set({ audioIndex:index}),
    setPlaying:(playing) => set({playing:playing}),
    audio:null,
    setAudio:(audio) => set({ audio:audio})
}))