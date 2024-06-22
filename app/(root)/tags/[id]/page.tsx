import QuestionCard from "@/components/cards/question-card";
import NoResults from "@/components/shared/no-results";
import Pagination from "@/components/shared/pagination";
import LocalSearchbar from "@/components/shared/search/local-searchbar";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";

const TagDetailsPage = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result?.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconSrc="/assets/icons/search.svg"
          iconPosition="left"
          placeholder="Search tag questions..."
          styles="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result === undefined || result.questions.length === 0 ? (
          <NoResults
            title="There's no tag questions to show"
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

export default TagDetailsPage;
