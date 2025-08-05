import { Image } from "../../components/Image/Image";
import { useCats } from "../../hooks/use-cats/use-cats";

export const CatVotingPage = () => {
  const { catImages, fetchNextPage, isFirstLoading, isFetchingNextPage } = useCats();

  if (isFirstLoading) {
    return <h1>LOADING...</h1>;
  }

  return (
    <main>
      <section>
        {catImages?.pages.map((imageGroup) =>
          imageGroup.map((catImage) => (
            <Image key={catImage.id} src={catImage.url} />
          ))
        )}
      </section>
      <hr className="h-3 bg-amber-500 my-3 border-none"/>
      <button onClick={() => fetchNextPage()}>FETCH MORE CATS</button>
      {isFetchingNextPage && <p>Loading more...</p>}
    </main>
  );
};
