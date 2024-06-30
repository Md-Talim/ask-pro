"use client";

import { toast } from "@/components/ui/use-toast";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  type: "Question" | "Answer";
  upvotes: number;
  downvotes: number;
}

const UnauthenticatedVotes = ({ type, upvotes, downvotes }: Props) => {
  const handleShowToast = () => {
    toast({
      title: "🔒 Please Log In",
      description:
        "You need to be logged in to vote or save. Click here to log in.",
      action: <Link href="/sign-in">Login</Link>,
    });
  };

  return (
    <div className="flex gap-5">
      <div className="flex items-center gap-2.5">
        <button
          onClick={handleShowToast}
          aria-label="Upvote"
          className="flex items-center gap-1.5"
        >
          <Image
            src="/assets/icons/upvote.svg"
            width={18}
            height={18}
            alt="Upvote"
            className="cursor-pointer"
          />
          <div className="bg-light700_dark400 flex min-w-[18px] items-center rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </button>

        <button
          onClick={handleShowToast}
          aria-label="Downvote"
          className="flex items-center gap-1.5"
        >
          <Image
            src="/assets/icons/downvote.svg"
            width={18}
            height={18}
            alt="Downvote"
            className="cursor-pointer"
          />
          <div className="bg-light700_dark400 flex min-w-[18px] items-center rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </button>
      </div>

      {type === "Question" && (
        <button
          onClick={handleShowToast}
          aria-label="Save"
          className="cursor-pointer"
        >
          <Image
            src="/assets/icons/star-red.svg"
            width={18}
            height={18}
            alt="Save"
            className="cursor-pointer"
          />
        </button>
      )}
    </div>
  );
};

export default UnauthenticatedVotes;
