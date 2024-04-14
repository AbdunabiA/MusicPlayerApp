import { create } from 'zustand'
import { AudioInstanceState, AudioListState, DialogProps } from './types'



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