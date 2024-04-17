import { Input } from "@/components/ui/input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import defImg from "@/assets/images/defaultMusicImg.jpg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "@/api";
import { ReactJkMusicPlayerAudioListProps } from "react-jinke-music-player";
import { memo, useEffect, useRef, useState } from "react";
import { useAudioListStore } from "@/store";
import AudioListRender from "@/components/audioList";
import { Button } from "@/components/ui/button";
import HomeSkeleton from "@/components/homeSkeleton";
import AlbumSkeleton from "@/components/albumSkeleton";
import { TopMusic } from "@/types";
const arr = [
  { albumType: "top", name: "Лучшая музыка", artist: null },
  { albumType: "chart", name: "Чарт музыка", artist: null },
];

const Home = memo(() => {
  const changeAudioList = useAudioListStore((state) => state.changeAudioList);
  const [searchParams] = useSearchParams();
  const [searchinput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["newMusic"],
    queryFn: () => fetchData(`/news?offset=0&limit=20`),
  });
  // console.log('home useQuery data', data);
  
  const {
    data: searchData,
    refetch,
    isFetching: isSearching,
  } = useQuery({
    queryKey: ["searchAudio"],
    queryFn: () => fetchData(`/search?offset=0&limit=1&title=${searchinput}`),
    enabled: false,
  });

  const getMoreAudio = async () => {
    const data = await fetchData(
      `/news?offset=${Number(searchParams.get("limit"))}&limit=${
        Number(searchParams.get("limit")) + 10
      }`
    );
    queryClient.setQueryData(["newMusic"], (oldData: TopMusic[]) => {
      if (data) {
        return [...oldData, ...data];
      }
    });
    // console.log('offset limit',data);
  };

  useEffect(() => {
    // console.log("isFetched", isFetchedAfterMount);
    // console.log("DATA", data);
    if (!searchinput) {
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
      if (audios) {
        changeAudioList(audios);
      }
      if (audios && audios?.length > 20 && buttonRef.current) {
        const buttonElement = buttonRef.current as HTMLElement; // Type assertion

        buttonElement.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      }
    }
    if (!searchParams.get("offset")) {
      navigate({
        pathname: "/",
        search: `offset=0&limit=20`,
      });
    }

    // console.log("AUDIOS", audios);
  }, [data, changeAudioList, searchinput]);

  useEffect(() => {
    // console.log("isFetched", isFetchedAfterMount);
    // console.log("DATA", data);
    if (searchinput) {
      const audios: ReactJkMusicPlayerAudioListProps[] | undefined =
        searchData?.map((track) => {
          return {
            name: track.music_name,
            musicSrc: track.key,
            singer: track?.artist_name,
            cover: track?.preview,
            key: track.key,
          };
        });
      // console.log("AUDIOS", audios);
      if (audios) changeAudioList(audios);
    }
  }, [searchData, changeAudioList, searchinput]);

  // console.log("data", data);
  // console.log("searchData", searchData);

  if (isLoading && Number(searchParams.get("limit")) === 20)
    return <HomeSkeleton />;

  return (
    <div className="container max-w-md h-[100dvh] overflow-y-auto">
      <div className="py-3 w-full sticky top-0 z-10 bg-slate-900 flex">
        <Input
          placeholder="search"
          onChange={(e) => setSearchInput(e.target.value)}
          className="bg-transparent p-4 text-gray-300 text-lg"
          value={searchinput}
        />
        {searchinput ? (
          <Button variant={"default"} onClick={() => refetch()}>
            Найти
          </Button>
        ) : null}
      </div>
      {isSearching ? (
        <AlbumSkeleton />
      ) : (
        <>
          <div className="p-1 w-full">
            <p className="text-xl font-bold text-gray-200 mt-2">Альбомы</p>
            <div className="flex gap-2 mt-3 w-full overflow-x-auto">
              {searchData && searchinput
                ? null
                : arr.map((el) => {
                    return (
                      <Link key={el.albumType} to={`/album/${el.albumType}`}>
                        <div className="">
                          <div
                            className={`h-32 w-36 bg-[url(${defImg})] bg-cover`}
                          >
                            <img
                              src={defImg}
                              alt="img"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-36 mt-2">
                            <p className="font-semibold text-gray-200 text-lg line-clamp-1">
                              {el.name}
                            </p>
                            <p className="text-gray-500 line-clamp-1">
                              {el.artist}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xl font-bold text-gray-200 mt-2">Новые песни</p>
            <div className="flex flex-col gap-1 mt-5 pb-36">
              <AudioListRender />
              <Button
                onClick={() => {
                  navigate({
                    pathname: "/",
                    search: `offset=${Number(
                      searchParams.get("limit")
                    )}&limit=${Number(searchParams.get("limit")) + 10}`,
                  });
                  getMoreAudio();
                }}
                disabled={isFetching}
                ref={buttonRef}
              >
                {isFetching ? "Loading" : "Еще"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default Home;
