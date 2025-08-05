import { type CatImage } from "../../modules/cat-voting/types";

export const mockCatImages: CatImage[] = Array.from({ length: 30 }, (_, i) => ({
  id: `cat-${i + 1}`,
  url: `https://cdn2.thecatapi.com/images/cat-${i + 1}.jpg`,
  width: 500,
  height: 400,
  breeds: [],
  categories: []
}));