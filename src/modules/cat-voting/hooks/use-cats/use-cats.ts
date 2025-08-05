import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCatImages } from "../../lib/fetch-cat-images/fetch-cat-images";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useCats = () => {
  const { data, fetchNextPage, status, isFetchingNextPage, isError } = useInfiniteQuery({
    queryKey: ["cats"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchCatImages(pageParam),
    getNextPageParam: (_, __, lastPageParam) => lastPageParam + 1,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load cat images. Please try again.");
    }
  }, [isError]);

  return {
    catImages: data,
    fetchNextPage,
    isFirstLoading: status === "pending",
    isFetchingNextPage,
    isError,
  };
};
