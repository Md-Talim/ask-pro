import { Document, Schema, model, models } from "mongoose";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  downvotes: Schema.Types.ObjectId[];
  question: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
}

const AnswerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
