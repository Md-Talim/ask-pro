import { Document, Schema, model, models } from "mongoose";

export interface IQuestion extends Document {
  answers: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  downvotes: Schema.Types.ObjectId[];
  tags: Schema.Types.ObjectId[];
  title: string;
  upvotes: Schema.Types.ObjectId[];
  views: number;
}

const QuestionSchema = new Schema({
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  title: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  views: { type: Number, default: 0 },
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
