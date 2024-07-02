import QuestionForm from "@/components/forms/question-form";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AskQuestionPage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const user = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-8">
        <QuestionForm userId={JSON.stringify(user._id)} />
      </div>
    </div>
  );
};

export default AskQuestionPage;
