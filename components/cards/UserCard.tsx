import RenderTag from "@/components/shared/RenderTag";
import { Badge } from "@/components/ui/badge";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full max-sm:min-w-full xs:w-64"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="User profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>

        <div className="mt-5">
          {interactedTags === undefined || interactedTags.length <= 0 ? (
            <Badge>No tags yet!</Badge>
          ) : (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} {...tag} />
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
