import Question from "@/database/question.model";
import Tag, { ITag } from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { FilterQuery } from "mongoose";
import {
  GetAllTagsParams,
  GetQuestionByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    // Find interactions for the user and group by tags...

    return [
      { _id: "1", name: "HTML" },
      { _id: "2", name: "CSS" },
      { _id: "3", name: "JavaScript" },
    ];
  } catch (error) {
    console.error(error);
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();

    const { filter, searchQuery, page = 1, pageSize = 10 } = params;
    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};
    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;
    }

    const skipAmount = (page - 1) * pageSize;
    const tags: ITag[] = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalTags = await Tag.countDocuments(query);
    const isNext = totalTags > tags.length + pageSize;

    return { tags, isNext };
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestionByTagId(params: GetQuestionByTagIdParams) {
  try {
    await connectToDatabase();

    const { tagId, searchQuery, page = 1, pageSize = 10 } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const skipAmount = (page - 1) * pageSize;
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found!");
    }

    const isNext = tag.questions.length > pageSize;
    const questions = tag.questions.slice(0, pageSize);

    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.error(error);
  }
}

export async function getPopularTags() {
  try {
    await connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.error(error);
  }
}
