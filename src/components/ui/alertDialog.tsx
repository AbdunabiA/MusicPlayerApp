import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  //   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useAudioInstanceStore,
  useCurrentAudio,
  useDialogStore,
} from "@/store";

const AlertDialogCustom = () => {
  const isOpen = useDialogStore((state) => state.isOpen);
  const onClose = useDialogStore((state) => state.onClose);
  const audioInstance = useAudioInstanceStore((state) => state.audioInstance);
  const playIndex = useDialogStore((state) => state.playIndex);
  const setLoading = useCurrentAudio((state) => state.setLoading);
  // console.log('isOpen', isOpen);

  return (
    <AlertDialog defaultOpen={isOpen} open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-300">
            Перейти на следующий трек?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Этот трек не может быть проигран из-за авторских прав
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-slate-900 text-gray-300"
            onClick={() => {
              setLoading(false);
            }}
          >
            Закрыть
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gray-300 text-slate-900"
            onClick={() => {
              if (audioInstance?.playByIndex)
                audioInstance.playByIndex(playIndex);
            }}
          >
            Следующий
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogCustom;
