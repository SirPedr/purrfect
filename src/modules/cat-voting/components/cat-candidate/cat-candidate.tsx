import React from "react";
import { useCatVoting } from "../../hooks/use-cat-voting/use-cat-voting";
import { VoteType } from "../../types";
import { Button } from "../../../../components/button/Button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { VoteFeedback } from "../vote-feedback/vote-feedback";

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  catId: string;
};

export const CatCandidate = ({ catId, ...imgProps }: Props) => {
  const voting = useCatVoting(catId);

  const handleVote = (voteType: VoteType) => {
    voting.mutate({ voteType, imageID: catId });
  };

  return (
    <figure className="border-2 shadow-brutal h-fit">
      <img {...imgProps} className="w-full" />
      <section className="p-3 border-t-2 flex gap-2">
        {voting.isSuccess ? (
          <VoteFeedback voteType={voting.variables!.voteType} />
        ) : (
          <React.Fragment>
            <Button
              onClick={() => handleVote(VoteType.NEGATIVE)}
              className="grow bg-red-200"
            >
              <ThumbsDown />
              Dislike
            </Button>

            <Button
              onClick={() => handleVote(VoteType.POSITIVE)}
              className="grow bg-yellow-300"
            >
              <ThumbsUp />
              Like
            </Button>
          </React.Fragment>
        )}
      </section>
    </figure>
  );
};
