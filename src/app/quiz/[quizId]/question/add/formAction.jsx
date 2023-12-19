"use server";

import quizModel from "@/models/quizModel";

export default async function action(formData, quizId) {
  const file = formData.get("attachment");
  let attachment = null;
  if (file.size > 0) {
    const base64String = Buffer.from(await file.arrayBuffer()).toString(
      "base64"
    );
    const mimeType = file.type;
    attachment = `data:${mimeType};base64,${base64String}`;
  }

  const question = {
    title: formData.get("title"),
    options: [],
    answers: [],
    attachment,
  };

  formData.forEach((v, k) => {
    if (k.startsWith("answer-")) {
      question.options.push(v);
    }
    if (k.startsWith("correct-")) {
      question.answers.push(parseInt(k.split("-")[1]));
    }
  });

  await quizModel.findByIdAndUpdate(quizId, {
    $push: {
      questions: question,
    },
  });

  return "Question added successfully.";
}
