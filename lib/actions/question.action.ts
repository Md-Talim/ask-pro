"use server";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";

export async function createQuestion(params: any) {
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

    for (const tag in tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // create an interaction record for the user's ask question action

    // increase user reputation by 5 for asking a question

    // allows to return new data for the path. Get's rid of the cache.
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
