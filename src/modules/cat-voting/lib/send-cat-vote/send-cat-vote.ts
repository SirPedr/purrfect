import { getAPIClient } from "../../../../lib/get-api-client/get-api-client";
import { getUserID } from "../../../../lib/get-user-id/get-user-id";
import { type VoteResult, type VoteType } from "../../types";

type SendVoteParams = {
  imageID: string;
  voteType: VoteType;
};

export const sendCatVote = async ({
  imageID,
  voteType,
}: SendVoteParams) => {
  const { data } = await getAPIClient().post<VoteResult>("/votes", {
    image_id: imageID,
    sub_id: getUserID(),
    value: voteType,
  });

  return data;
};
