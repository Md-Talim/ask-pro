"use server";

import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 20 } = params;
    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
    }

    // Calculate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalQuestions = await Question.countDocuments(query);
    const isNext = totalQuestions > skipAmount + questions.length;

    return { questions, isNext };
  } catch (error) {
    console.error(error);
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to database
    await connectToDatabase();

    const { title, content, tags, author, path } = params;

    // create question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true },
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // create an interaction record for the user's ask question action
    await Interaction.create({
      action: "ask_question",
      question: question._id,
      user: author,
      tags: tagDocuments,
    });

    // increase user reputation by 5 for asking a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    // allows to return new data for the path. Get's rid of the cache.
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });

    // Delete interactions and actions related to the question
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });

    // Update tags to remove references to the deleted question
    await Tag.updateMany(
      { question: questionId },
      { $pull: { questions: questionId } },
    );

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.error(error);
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();

    const { questionId, userId, hasUpvoted, hasDownvoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found!");
    }

    // Increment users's reputation by +2/-2 for upvoting/revoking an upvote to the question
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasUpvoted ? -1 : 1 },
    });

    // Increment question author's reputation by +10/-10 for receiving an upvote/downvote to the question
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasUpvoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();

    const { questionId, userId, hasUpvoted, hasDownvoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found!");
    }

    // Decrement author's reputation by -1/+1 for downvoting/revoking downvote to a question
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasDownvoted ? -1 : 1 },
    });

    // Decrement question author's reputation by -2/+2 for receiving a downvote
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasDownvoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, title, content, path } = params;
    const question = await Question.findById(questionId);

    if (!question) {
      throw new Error("Question not found!");
    }

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getTopQuestions() {
  try {
    await connectToDatabase();

    const topQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);

    return topQuestions;
  } catch (error) {
    console.error(error);
  }
}
