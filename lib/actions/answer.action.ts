"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
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

export async function getAnswers(params: GetAnswersParams) {
  try {
    await connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return answers;
  } catch (error) {
    console.error(error);
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase();

    const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

    let updateQuery = {};

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found!");
    }

    // TODO: Increment author's reputation

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase();

    const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

    let updateQuery = {};

    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found!");
    }

    // TODO: Increment author's reputation

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
