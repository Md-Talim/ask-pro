import QuestionCard from "@/components/cards/question-card";
import Filter from "@/components/shared/filter";
import NoResults from "@/components/shared/no-results";
import Pagination from "@/components/shared/pagination";
import LocalSearchbar from "@/components/shared/search/local-searchbar";
import { questionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

const CollectionPage = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/collection"
          iconSrc="/assets/icons/search.svg"
          iconPosition="left"
          placeholder="Search questions..."
          styles="flex-1"
        />

        <Filter
          filters={questionFilters}
          triggerStyles="min-h-14 sm:min-w-40"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result === undefined || result.questions.length === 0 ? (
          <NoResults
            title="There's no questions to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/"
            linkTitle="Save a Question"
          />
        ) : (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={result?.isNext}
        />
      </div>
    </>
  );
};

export default CollectionPage;
