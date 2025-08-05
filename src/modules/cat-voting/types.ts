export enum VoteType {
  POSITIVE = 1,
  NEGATIVE = -1,
}

export type CatImage = {
  breeds: unknown[];
  categories?: unknown[];
  height: number;
  width: number;
  id: string;
  url: string;
};

export type VoteResult = {
  country_code: string;
  id: number;
  image_id: string;
  message: string;
  sub_id: string;
  value: VoteType;
};
