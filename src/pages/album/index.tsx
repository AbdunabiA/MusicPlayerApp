import { fetchData } from "@/api";
import AudioListRender from "@/components/audioList";
import { useAudioListStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ReactJkMusicPlayerAudioListProps } from "react-jinke-music-player";
import { Link, useParams, useSearchParams } from "react-router-dom";


const Album = () => {
  const changeAudioList = useAudioListStore((state) => state.changeAudioList);
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  // const location = useLocation();
  const { albumType } = useParams()
  const [limit] = useState<number>(Number(searchParams.get("limit")) || 20);

  const { data } = useQuery({
    queryKey: ["groups", limit],
    queryFn: () => fetchData(`/${albumType}?offset=0&limit=${limit}`),
  });

  useEffect(() => {
    // console.log("isFetched", isFetchedAfterMount);
    console.log("DATA", data);

    const audios: ReactJkMusicPlayerAudioListProps[] | undefined = data?.map(
      (track) => {
        return {
          name: track.title,
          musicSrc: track.key,
          singer: track?.artists_id?.reduce(
            (acc: string, el) => acc + el + " ",
            ""
          ),
          cover: track?.preview,
          key: track.key,
        };
      }
    );
    console.log("AUDIOS", audios);
    if (audios) changeAudioList(audios);
  }, [data, changeAudioList]);

  console.log("data", data);
  return (
    <div className="container max-w-md h-[100dvh] overflow-y-auto pt-4">
      <Link to={"/"} className="text-gray-300 text-lg font-semibold">Назад</Link>
      <div className="mt-4">
        <p className="text-xl font-bold text-gray-200 mt-2">
          {albumType === "top" ? "Лучшая музыка" : "Чарт музыка"}
        </p>
        <div className="flex flex-col gap-4 mt-5 pb-36">
          <AudioListRender />
          {/* <Button
            onClick={() => {
              navigate({
                pathname: "/",
                search: `offset=0&limit=${Number(limit) + 10}`,
              });
              setLimit(state=>state+10);
              
            }}
            disabled={isFetching}
          >
            {isFetching ? "Loading" : "Еще"}
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default Album