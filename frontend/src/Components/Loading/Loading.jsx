import { useLoading } from "../../Hooks/useLoading";


export default function Loading() {
  const { isLoading } = useLoading();
  if (!isLoading) return;

  return (
    <div className="bg-WhiteLoading-rgba fixed left-0 top-0 z-50 h-full w-full">
      <div className="flex h-[80%] w-full flex-col items-center justify-center">
        <img src="/loading.svg" alt="Loading!" />
        <h1 className="text-[2rem] text-gray-800 font-semibold">
          Loading...
        </h1>
      </div>
    </div>
  );
}
