import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

interface GetQuestionByIdParams {
  questionId: string;
}

interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

interface DeleteUserParams {
  clerkId: string;
}

interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
