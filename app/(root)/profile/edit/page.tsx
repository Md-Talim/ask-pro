import ProfileForm from "@/components/forms/profile-form";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

const QuestionEditPage = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const user = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <ProfileForm clerkId={userId} user={JSON.stringify(user)} />
      </div>
    </>
  );
};

export default QuestionEditPage;
