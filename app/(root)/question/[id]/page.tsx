import Metric from "@/components/shared/Metric";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

const QuestionPage = async ({ params }: Props) => {
  const question = await getQuestionById({ questionId: params.id });

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
          <div className="flex justify-end">VOTING</div>
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
    </>
  );
};

export default QuestionPage;
