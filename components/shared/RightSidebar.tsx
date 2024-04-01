import Image from "next/image";
import Link from "next/link";

/**
 * Dummy data
 */
const topQuestions = [
  { _id: 1, title: "How do I use express as a custom server in NextJS?" },
  { _id: 2, title: "Cascading Deletes in SQLAlchemy?" },
  { _id: 3, title: "How to Perfectly Center a Div with Tailwind CSS?" },
  {
    _id: 4,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  { _id: 5, title: "Redux Toolkit Not Updating State as Expected" },
];

const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 fixed right-0 bottom-0 h-full flex flex-col justify-between pb-6 pt-36 max-md:pb-14 px-6 max-lg:hidden shadow-light-300 dark:shadow-none border-l">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex flex-col w-full gap-5">
          {topQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/questions/${question._id}`}
              className="flex cursor-pointer items-center justify-between"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                className="invert-colors"
                alt="Chevron right"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
