import { Input } from "@/components/ui/input";
import {
  Link,
  // useNavigate,
  useSearchParams,
} from "react-router-dom";
import defImg from "@/assets/images/defaultMusicImg.jpg";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/api";
import { ReactJkMusicPlayerAudioListProps } from "react-jinke-music-player";
import { memo, useEffect, useState } from "react";
import { useAudioListStore } from "@/store";
import AudioListRender from "@/components/audioList";
// import { Button } from "@/components/ui/button";
const arr = [
  { albumType: "top", name: "Лучшая музыка", artist: null },
  { albumType: "chart", name: "Чарт музыка", artist: null },
];

const Home = memo(() => {
  const changeAudioList = useAudioListStore((state) => state.changeAudioList);
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  // const location = useLocation();
  const [limit] = useState<number>(Number(searchParams.get("limit")) || 20)

  const { data, } = useQuery({
    queryKey: ["groups", limit],
    queryFn: () => fetchData(`/news?offset=0&limit=${limit}`),
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
    <div className="container max-w-md h-[100dvh] overflow-y-auto">
      <div className="py-3 w-full sticky top-0 bg-sky-900">
        <Input placeholder="search" />
      </div>
      <div className="p-1 w-full">
        <p className="text-xl font-bold text-gray-200 mt-2">Альбомы</p>
        <div className="flex gap-2 mt-3 w-full overflow-x-auto">
          {arr.map((el) => {
            return (
              <Link key={el.albumType} to={`/album/${el.albumType}`}>
                <div className="">
                  <div className={`h-32 w-36 bg-[url(${defImg})] bg-cover`}>
                    <img
                      src={defImg}
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-32">
                    <p className="font-semibold text-gray-200 text-md line-clamp-1">
                      {el.name}
                    </p>
                    <p className="text-gray-500 line-clamp-1">{el.artist}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold text-gray-200 mt-2">Новые песни</p>
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
      {/* <audio src="" controls></audio> */}
    </div>
  );
});

export default Home;
