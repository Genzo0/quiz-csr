"use client";

import { useState, useEffect } from "react";
import { ObjectId } from "mongoose";
import StartForm from "./StartForm";

export default function Detail({ params }) {
  const [quiz, setQuiz] = useState({});
  const [isLoading, setLoading] = useState(true);

  const quizId = params.quizId;

  useEffect(() => {
    const getQuiz = async () => {
      const res = await fetch(`/api/quizzes/${quizId}`);
      const { data } = await res.json();
      setQuiz(data);
      setLoading(false);
    };
    getQuiz();
  }, []);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-xl font-semibold lg:text-5xl">Loading...</h1>
      </div>
    );

  return (
    <div className="flex h-screen flex-col gap-4 p-5 lg:p-16">
      <main className="grow rounded-3xl bg-white/30 p-8">
        <div className="text-center lg:mb-4">
          <h1 className="font-semibold lg:mb-2 lg:text-5xl">{quiz.title}</h1>
          <h2 className="lg:text-2xl">
            Created at{" "}
            {new mongoose.Types.ObjectId(quiz._id)
              .getTimestamp()
              .toLocaleString()}
          </h2>
        </div>
        <hr className="mb-4 opacity-50" />
        <p className="text-lg">Description:</p>
        <p>{quiz.description}</p>
      </main>
      <StartForm quizId={quizId} />
    </div>
  );
}
