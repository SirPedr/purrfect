import { Button } from "../../../../components/button/Button";
import { CatCandidate } from "../../components/cat-candidate/cat-candidate";
import { useCats } from "../../hooks/use-cats/use-cats";

export const CatVotingPage = () => {
  const { catImages, fetchNextPage, isFirstLoading, isFetchingNextPage } =
    useCats();

  if (isFirstLoading) {
    return <h1>LOADING...</h1>;
  }

  return (
    <main className="p-3">
      <section className="flex flex-col gap-5">
        {catImages?.pages.map((imageGroup, groupIndex) =>
          imageGroup.map((catImage, index) => (
            <CatCandidate
              key={catImage.id}
              catId={catImage.id}
              src={catImage.url}
              alt={`Cat #${imageGroup.length * groupIndex + index + 1}`}
              width={catImage.width}
              height={catImage.height}
            />
          ))
        )}
      </section>

      <section className="mt-5"> 
        <Button onClick={() => fetchNextPage()} className="text-center text-xl w-full bg-blue-500 text-white h-12">
          FETCH MORE CATS
        </Button>
        {isFetchingNextPage && <p>Loading more...</p>}
      </section>
    </main>
  );
};
