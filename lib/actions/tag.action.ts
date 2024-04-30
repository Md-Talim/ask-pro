import Tag, { ITag } from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";

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

    const tags: ITag[] = await Tag.find({});

    return { tags };
  } catch (error) {
    console.error(error);
  }
}
