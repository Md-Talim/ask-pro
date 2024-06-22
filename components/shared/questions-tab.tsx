import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/question-card";
import Pagination from "./pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionsTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result?.questions.map((item: any) => (
        <QuestionCard
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          title={item.title}
          tags={item.tags}
          author={item.author}
          upvotes={item.upvotes.length}
          views={item.views}
          answers={item.answers}
          createdAt={item.createdAt}
        />
      ))}

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={result?.isNext}
        />
      </div>
    </>
  );
};

export default QuestionsTab;
