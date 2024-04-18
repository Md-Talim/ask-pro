import QuestionForm from "@/components/forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const AskQuestionPage = async () => {
  const userId = "12345";

  if (!userId) redirect("/");

  const user = await getUserById({ userId });

  console.log(user);

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
