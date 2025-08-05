import { useMutation } from "@tanstack/react-query";
import { sendCatVote } from "../../lib/send-cat-vote/send-cat-vote";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useCatVoting = (catId: string) => {
  const voteMutation = useMutation({
    mutationFn: sendCatVote,
    mutationKey: ["vote", catId],
  });

  useEffect(() => {
    if (voteMutation.isError) {
      toast.error("Failed to save your vote. Please try again.");
    }
  }, [voteMutation.isError]);

  return {
    ...voteMutation,
    isSuccess:
      voteMutation.isSuccess ||
      (voteMutation.isPending && voteMutation.variables?.voteType),
  };
};
