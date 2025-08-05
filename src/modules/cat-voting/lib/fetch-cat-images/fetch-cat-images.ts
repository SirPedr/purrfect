import { getAPIClient } from "../../../../lib/get-api-client/get-api-client";
import type { CatImage } from "../../types";

export const fetchCatImages = async (page: number) => {
  const { data } = await getAPIClient().get<CatImage[]>("/images/search", {
    params: {
      limit: 10,
      page
    },
  });

  return data;
};
