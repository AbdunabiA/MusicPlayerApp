import { Skeleton } from "../ui/skeleton";
const arr = [1, 2,3, 4, 5, 6]

const HomeSkeleton = () => {
  return (
    <div className="container max-w-md h-[100dvh] overflow-y-auto">
        <div className="py-3 w-full sticky top-0 bg-slate-900 flex">
          <Skeleton className="w-full h-5" />
        </div>
      <div className="p-1 w-full">
        <Skeleton className="mt-2 w-44 h-5" />
        <div className="flex gap-2 mt-3 w-full overflow-x-auto">
          <div className="album">
            <div className={`h-32 w-36`}>
              <Skeleton className="h-full w-full" />
            </div>
            <div className="w-36 mt-2">
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
          <div className="album">
            <div className={`h-32 w-36`}>
              <Skeleton className="h-full w-full" />
            </div>
            <div className="w-36 mt-2">
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Skeleton className="w-44 h-4" />
        <div className="flex flex-col gap-1 mt-5 pb-36">
          {arr.map((el) => (
            <div
              className={`flex items-center gap-4 overflow-hidden rounded-sm p-2`}
              key={el}
            >
              <div className={`w-[10vh] h-[10vh] `}>
                <Skeleton className="w-full h-full" />
              </div>
              <div className="max-w-[200px]">
                <Skeleton className="w-44 h-4" />
                <Skeleton className="w-44 h-4 mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeSkeleton