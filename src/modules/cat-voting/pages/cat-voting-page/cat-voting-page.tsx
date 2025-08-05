import { Button } from "../../../../components/button/Button";
import { Spinner } from "../../../../components/spinner/Spinner";
import { CatCandidate } from "../../components/cat-candidate/cat-candidate";
import { useCats } from "../../hooks/use-cats/use-cats";

export const CatVotingPage = () => {
  const { catImages, fetchNextPage, isFirstLoading, isFetchingNextPage } =
    useCats();

  if (isFirstLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="p-3">
      <section className="columns-1 md:columns-3 lg:columns-4 gap-5 [&>*]:mb-5 [&>*]:break-inside-avoid">
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

      <section className="mt-8 md:w-fit md:mx-auto"> 
        <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()} className="text-center px-2 text-xl w-full bg-blue-500 text-white h-12 md:px-6">
          FETCH MORE CATS
        </Button>
      </section>
    </main>
  );
};
