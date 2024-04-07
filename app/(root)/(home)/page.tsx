import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse md:flex-row justify-between">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question">
          <Button className="primary-gradient px-4 py-2 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <div>LocalSearchBar</div>

        <div>Filters</div>
      </div>
    </>
  );
};

export default HomePage;
