import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { userFilters } from "@/constants/filters";

const CommunityPage = async () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconSrc="/assets/icons/search.svg"
          iconPosition="left"
          placeholder="Search questions..."
          styles="flex-1"
        />

        <Filter filters={userFilters} triggerStyles="min-h-14 sm:min-w-40" />
      </div>
    </>
  );
};

export default CommunityPage;
