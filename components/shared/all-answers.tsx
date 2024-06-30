import { UnauthenticatedVotes, Votes } from "@/components/shared/votes";
import { answerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Filter from "./filter";
import Pagination from "./pagination";
import ParseHTML from "./parse-html";

interface Props {
  questionId: string;
  userId?: string;
  totalAnswers: number;
  page?: string;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  if (totalAnswers === 0) {
    return (
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">0 Answers</h3>

        <Filter filters={answerFilters} />
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers > 1 ? "Answers" : "Answer"}
        </h3>

        <Filter filters={answerFilters} />
      </div>

      <div>
        {result?.answers?.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            {/* SPAN ID */}
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  alt="profile"
                  width={18}
                  height={18}
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}{" "}
                  </p>
                  <p className="small-regular text-light400_light500 ml-2 mt-0.5 line-clamp-1">
                    answered {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              {/* Voting section */}
              <div className="flex justify-end">
                {userId ? (
                  <Votes
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasUpvoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasDownvoted={answer.downvotes.includes(userId)}
                  />
                ) : (
                  <UnauthenticatedVotes
                    type="Answer"
                    upvotes={answer.upvotes.length}
                    downvotes={answer.downvotes.length}
                  />
                )}
              </div>
            </div>

            <ParseHTML content={answer.content} />
          </article>
        ))}
      </div>

      <div className="mt-10 w-full">
        <Pagination pageNumber={page ? +page : 1} isNext={result?.isNext} />
      </div>
    </section>
  );
};

export default AllAnswers;
