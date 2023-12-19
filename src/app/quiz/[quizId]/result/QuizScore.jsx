"use client";

import { getStorageAnswers } from "@/lib/localStorage";

export default function QuizScore({ answers, quizId }) {
  const userAnswers = getStorageAnswers(quizId);
  let correctAnswer = 0;
  userAnswers.forEach((userAnswer, i) => {
    if (answers[i]?.includes(userAnswer)) correctAnswer++;
  });
  const score = (correctAnswer * 100) / answers.length;

  return <p className="mb-24 text-9xl font-bold">{score.toFixed(2)}%</p>;
}
