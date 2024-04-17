import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  bio?: string;
  clerkId: string;
  email: string;
  joinedAt: Date;
  location?: string;
  name: string;
  password?: string;
  picture: string;
  portforlioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  username: string;
}

const UserSchema = new Schema({
  bio: { type: String },
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  joinedAt: { type: Date, default: Date.now },
  location: { type: String },
  name: { type: String, required: true },
  password: { type: String },
  picture: { type: String, required: true },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  username: { type: String, required: true, unique: true },
});

const User = models.User || model("User", UserSchema);

export default User;
