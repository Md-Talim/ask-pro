import Filter from "@/components/shared/filter";
import NoResults from "@/components/shared/no-results";
import LocalSearchbar from "@/components/shared/search/local-searchbar";
import { tagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

const TagsPage = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconSrc="/assets/icons/search.svg"
          iconPosition="left"
          placeholder="Search by tag name..."
          styles="flex-1"
        />

        <Filter filters={tagFilters} triggerStyles="min-h-14 sm:min-w-40" />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result?.tags === undefined || result?.tags.length <= 0 ? (
          <NoResults
            title="No Tags Found!"
            description="It looks there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        ) : (
          result.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-64">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1">
                  <p className="paragraph-semibold">{tag.name}</p>
                </div>
                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))
        )}
      </section>
    </>
  );
};

export default TagsPage;
