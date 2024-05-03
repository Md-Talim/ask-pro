"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: any) {
  try {
    await connectToDatabase();

    const { author, content, question, path } = params;

    const answer = await Answer.create({
      author,
      content,
      question,
    });

    // Add the answer to the question's answer array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
