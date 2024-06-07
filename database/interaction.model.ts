import { Document, Schema, model, models } from "mongoose";

export interface IInteraction extends Document {
  action: string;
  answer: Schema.Types.ObjectId;
  createdAt: Date;
  question: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  user: Schema.Types.ObjectId;
}

const InteractionSchema = new Schema({
  action: { type: String, required: true },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  createdAt: { type: Date, default: Date.now },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Interaction =
  models?.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
