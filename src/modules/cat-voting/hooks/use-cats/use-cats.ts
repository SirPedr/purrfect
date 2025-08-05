import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCatImages } from "../../lib/fetch-cat-images/fetch-cat-images";

export const useCats = () => {
  const { data, fetchNextPage, status, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["cats"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchCatImages(pageParam),
    getNextPageParam: (_, __, lastPageParam) => lastPageParam + 1,
  });

  return {
    catImages: data,
    fetchNextPage,
    isFirstLoading: status === "pending",
    isFetchingNextPage,
  }
};
