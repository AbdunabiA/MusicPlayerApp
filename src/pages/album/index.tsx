import { fetchData } from "@/api";
import AlbumSkeleton from "@/components/albumSkeleton";
import AudioListRender from "@/components/audioList";
import { Button } from "@/components/ui/button";
import { useAudioListStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ReactJkMusicPlayerAudioListProps } from "react-jinke-music-player";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";


const Album = () => {
  const changeAudioList = useAudioListStore((state) => state.changeAudioList);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const { albumType } = useParams()
  const buttonRef = useRef(null)
  const [limit, setLimit] = useState<number>(Number(searchParams.get("limit")) || 20);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["groups", limit],
    queryFn: () => fetchData(`/${albumType}?offset=0&limit=${limit}`),
  });
  
  useEffect(() => {
    // console.log("isFetched", isFetchedAfterMount);
    console.log("DATA", data);

    const audios: ReactJkMusicPlayerAudioListProps[] | undefined = data?.map(
      (track) => {
        return {
          name: track.music_name,
          musicSrc: track.key,
          singer: track?.artist_name,
          cover: track?.preview,
          key: track.key,
        };
      }
    );
    console.log("AUDIOS", audios);
    if (audios) changeAudioList(audios);
    if (audios && audios?.length > 20 && buttonRef.current) {
      const buttonElement = buttonRef.current as HTMLElement; // Type assertion

      buttonElement.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, [data, changeAudioList]);

  console.log("data", data);

  if(isLoading && limit === 20) return <AlbumSkeleton/>
  return (
    <div className="container max-w-md h-[100dvh] overflow-y-auto pt-4">
      <Button onClick={()=>navigate('/')} variant='default'>Назад</Button>
      <div className="mt-4">
        <p className="text-xl font-bold text-gray-200 mt-2">
          {albumType === "top" ? "Лучшая музыка" : "Чарт музыка"}
        </p>
        <div className="flex flex-col gap-1 mt-5 pb-36">
          <AudioListRender />
          <Button
            onClick={() => {
              navigate({
                pathname: `/album/${albumType}`,
                search: `offset=0&limit=${Number(limit) + 10}`,
              });
              setLimit(state=>state+10);
              
            }}
            disabled={isFetching}
            ref={buttonRef}
          >
            {isFetching ? "Loading" : "Еще"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Album