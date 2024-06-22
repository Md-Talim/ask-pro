import QuestionCard from "@/components/cards/question-card";
import HomeFilters from "@/components/home/home-filters";
import Filter from "@/components/shared/filter";
import NoResults from "@/components/shared/no-results";
import Pagination from "@/components/shared/pagination";
import LocalSearchbar from "@/components/shared/search/local-searchbar";
import { Button } from "@/components/ui/button";
import { homePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

const HomePage = async ({ searchParams }: SearchParamsProps) => {
  const result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between md:flex-row">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question">
          <Button className="primary-gradient px-4 py-2 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconSrc="/assets/icons/search.svg"
          iconPosition="left"
          placeholder="Search questions..."
          styles="flex-1"
        />

        <Filter
          filters={homePageFilters}
          triggerStyles="min-h-14 sm:min-w-40"
          containerStyles="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result === undefined || result.questions.length === 0 ? (
          <NoResults
            title="There's no questions to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        ) : (
          result.questions.map((question) => (
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

export default HomePage;
