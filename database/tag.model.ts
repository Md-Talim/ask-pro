import { Document, Schema, model, models } from "mongoose";

export interface ITag extends Document {
  createdOn: Date;
  description: string;
  followers: Schema.Types.ObjectId[];
  name: string;
  questions: Schema.Types.ObjectId[];
}

const TagSchema = new Schema({
  createdOn: { type: Date, default: Date.now },
  description: { type: String, required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  name: { type: String, required: true, unique: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
