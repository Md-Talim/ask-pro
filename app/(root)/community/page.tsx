import UserCard from "@/components/cards/user-card";
import Filter from "@/components/shared/filter";
import LocalSearchbar from "@/components/shared/search/local-searchbar";
import { userFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

const CommunityPage = async ({ searchParams }: SearchParamsProps) => {
  const results = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconSrc="/assets/icons/search.svg"
          iconPosition="left"
          placeholder="Search for amazing minds..."
          styles="flex-1"
        />

        <Filter filters={userFilters} triggerStyles="min-h-14 sm:min-w-40" />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {results?.users === undefined || results?.users.length <= 0 ? (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet.</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        ) : (
          results.users.map((user) => <UserCard key={user._id} user={user} />)
        )}
      </section>
    </>
  );
};

export default CommunityPage;
