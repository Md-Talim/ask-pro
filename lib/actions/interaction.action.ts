"use server";

import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import { connectToDatabase } from "@/lib/mongoose";
import { ViewQuestionParams } from "./shared.types";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { userId, questionId } = params;

    // Get the question and its tags
    const question = await Question.findById(questionId);

    if (!question) {
      console.warn("Question not found!");
      return;
    }

    // Update the view count for the question
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    // check if the user has already viewed the question
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        question: questionId,
        action: "view",
      });

      if (existingInteraction) {
        console.log("User has alreay viewed this question!");
        return;
      }

      // create an interaction record for the user's view action with all question tags
      await Interaction.create({
        user: userId,
        question: questionId,
        action: "view",
        tags: question.tags,
      });
    }

    console.log("Question view incremented successfully!");
  } catch (error) {
    console.error(error);
  }
}
