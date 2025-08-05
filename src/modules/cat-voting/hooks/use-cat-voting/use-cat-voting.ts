import { useMutation } from "@tanstack/react-query";
import { sendCatVote } from "../../lib/send-cat-vote/send-cat-vote";

export const useCatVoting = () => {
  const voteMutation = useMutation({
    mutationFn: sendCatVote,
  });

  return {
    ...voteMutation,
    isSuccess:
      voteMutation.isSuccess ||
      (voteMutation.isPending && voteMutation.variables?.voteType),
  };
};
