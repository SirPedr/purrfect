import { Text } from "../../../../components/text/text";
import { VoteType } from "../../types";

type Props = {
  voteType: VoteType;
};

export const VoteFeedback = ({ voteType }: Props) =>
  voteType === VoteType.POSITIVE ? (
    <Text>You liked this cat! It's very happy right now.</Text>
  ) : (
    <Text>
      You didn't like this cat. But <strong className="bg-yellow-300 p-1 skew-1">WHY?</strong>
    </Text>
  );
