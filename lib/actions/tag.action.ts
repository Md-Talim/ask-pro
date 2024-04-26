import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();

    const { userId, limit = 3 } = params;

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
