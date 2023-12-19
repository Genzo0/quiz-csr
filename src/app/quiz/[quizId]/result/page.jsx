"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import QuizScore from "./QuizScore";
import UserName from "./UserName";

export default function Result({ params }) {
  const { quizId } = params;

  const [quiz, setQuiz] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const getQuiz = async () => {
      const res = await fetch(`/api/quizzes/${quizId}`);
      const { data } = await res.json();
      setQuiz(data);
      setAnswers(data.questions.map((question) => question.answers));
      setLoading(false);
    };
    getQuiz();
  });

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-xl font-semibold lg:text-5xl">Loading...</h1>
      </div>
    );

  return (
    <main className="p-5 lg:p-16">
      <section className="mb-4 lg:mb-8">
        <h1 className="mb-2 text-4xl font-semibold lg:mb-4 lg:text-7xl">
          Final Result
        </h1>
        <h2 className="mb-24 lg:text-3xl">
          Hello <UserName />, congratulations for finishing the quiz. Your final
          score is:
        </h2>

        <QuizScore answers={answers} quizId={quizId} />

        <Link
          href="/"
          className="rounded-lg border border-white/50 px-4 py-2 text-lg"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
