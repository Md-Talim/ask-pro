"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { SearchParams } from "./shared.types";

const SearchableTypes = ["question", "answer", "user", "tag"];

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { searchQuery, queryType } = params;
    const regexQuery = { $regex: searchQuery, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    if (!queryType || !SearchableTypes.includes(queryType)) {
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((result) => ({
            title:
              type === "answer"
                ? `Answers containing ${searchQuery}`
                : result[searchField],
            type,
            id:
              type === "user"
                ? result.clerkId
                : type === "answer"
                  ? result.question
                  : result._id,
          })),
        );
      }
    } else {
      const modelInfo = modelsAndTypes.find((item) => item.type === queryType);

      if (!modelInfo) {
        throw new Error("Invalid search type!");
      }

      const queryResults = await modelInfo.model.find({
        [modelInfo.searchField]: regexQuery,
      });

      results = queryResults.map((result) => ({
        title:
          queryType === "answer"
            ? `Answers containing ${searchQuery}`
            : result[modelInfo.searchField],
        type: queryType,
        id:
          queryType === "user"
            ? result.clerkId
            : queryType === "answer"
              ? result.question
              : result._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.error(error);
  }
}
