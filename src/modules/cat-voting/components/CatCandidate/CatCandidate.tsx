import React from "react";
import { useCatVoting } from "../../hooks/use-cat-voting/use-cat-voting";
import { VoteType } from "../../types";

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  catId: string;
};

export const CatCandidate = ({ catId, ...imgProps }: Props) => {
  const voting = useCatVoting();

  const handleVote = (voteType: VoteType) => {
    voting.mutate({ voteType, imageID: catId });
  };

  return (
    <figure>
      <img {...imgProps} />
      <section className={voting.isPending ? "opacity-75" : undefined}>
        {voting.isSuccess ? (
          "You voted " + voting.variables?.voteType
        ) : (
          <React.Fragment>
            <button
              onClick={() => handleVote(VoteType.POSITIVE)}
              disabled={voting.isPending}
            >
              Up
            </button>
            <button
              onClick={() => handleVote(VoteType.NEGATIVE)}
              disabled={voting.isPending}
            >
              Down
            </button>
          </React.Fragment>
        )}
      </section>
    </figure>
  );
};
