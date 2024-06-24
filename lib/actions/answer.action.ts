"use server";

import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase();

    const { author, content, questionId, path } = params;

    const answer = await Answer.create({
      author,
      content,
      question: questionId,
    });

    // Add the answer to the question's answer array
    const question = await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer._id },
    });

    await Interaction.create({
      user: author,
      action: "answer",
      question: questionId,
      answer,
      tags: question.tags,
    });

    await User.findByIdAndUpdate(author, { $inc: { repuation: 10 } });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    await connectToDatabase();

    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);
    if (!answer) {
      throw new Error("Answer not found!");
    }

    await Answer.deleteOne({ _id: answerId });

    // Delete interactions related to the question
    await Interaction.deleteMany({ answer: answerId });

    // Remove the answer reference from its question
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } },
    );

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    await connectToDatabase();

    const { questionId, sortBy, page = 1, pageSize = 10 } = params;

    let sortOptions = {};
    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
    }

    const skipAmount = (page - 1) * pageSize;
    const answers = await Answer.find({ question: questionId })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("author", "_id clerkId name picture")
      .sort(sortOptions);

    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const isNext = totalAnswers > skipAmount + answers.length;

    return { answers, isNext };
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

    // Increment user's reputation
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasUpvoted ? -2 : 2 },
    });

    // Increment author's reputation
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasUpvoted ? -10 : 10 },
    });

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

    // Increment user's reputation
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasDownvoted ? -2 : 2 },
    });

    // Increment author's reputation
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasDownvoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
