import AnswerForm from "@/components/forms/answer-form";
import AllAnswers from "@/components/shared/all-answers";
import Metric from "@/components/shared/metric";
import ParseHTML from "@/components/shared/parse-html";
import RenderTag from "@/components/shared/render-tag";
import Votes from "@/components/shared/votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const QuestionPage = async ({ params, searchParams }: URLProps) => {
  const question = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth();

  if (!clerkId) {
    redirect("/sign-up");
  }

  const user = await getUserById({ userId: clerkId });

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              height={22}
              width={22}
              alt="Profile photo"
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(user._id)}
              upvotes={question.upvotes.length}
              hasUpvoted={question.upvotes.includes(user._id)}
              downvotes={question.downvotes.length}
              hasDownvoted={question.downvotes.includes(user._id)}
              hasSaved={user.saved.includes(question._id)}
            />
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          iconUrl="/assets/icons/clock.svg"
          alt="Clock"
          value={`asked ${getTimestamp(question.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          iconUrl="/assets/icons/message.svg"
          alt="Messages"
          value={formatAndDivideNumber(question.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          iconUrl="/assets/icons/eye.svg"
          alt="Eye"
          value={formatAndDivideNumber(question.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML content={question.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="mt-11">
        <AllAnswers
          questionId={question._id}
          userId={user._id}
          totalAnswers={question.answers.length}
          page={searchParams?.page}
          filter={searchParams?.filter}
        />
      </div>

      <div className="mt-6">
        <AnswerForm
          question={question.content}
          questionId={JSON.stringify(question._id)}
          authorId={JSON.stringify(user._id)}
        />
      </div>
    </>
  );
};

export default QuestionPage;
