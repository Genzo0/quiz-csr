"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import QuestionOptions from "./QuestionOptions";
import Image from "next/image";

export default function Question({ params }) {
  const { quizId, id } = params;

  const [quiz, setQuiz] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    const getQuiz = async () => {
      const res = await fetch(`/api/quizzes/${quizId}`);
      const { data } = await res.json();
      setQuiz(data);
      setQuestion(data.questions[id - 1]);
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
    <main className="flex h-screen flex-col gap-4 p-5 lg:p-12">
      <section className="rounded-3xl border-2 border-white/50 p-4 flex items-center flex-col gap-4 shadow-md lg:px-8 lg:py-20 ">
        <p className="text-md lg:text-2xl">{question.title}</p>
        <MediaRenderer base64Data={question.attachment} />
      </section>
      <section className="grid grow gap-4 lg:grid-cols-2">
        <QuestionOptions
          options={question.options}
          quizId={quizId}
          id={id - 1}
        />
      </section>
      <section className="flex items-center justify-center gap-4 pb-4">
        {[...Array(quiz.questions.length)].map((_, i) => (
          <Link
            key={i}
            href={`/quiz/${quizId}/question/${i + 1}`}
            className={
              `grid h-12 w-12 place-items-center rounded-lg border border-white/50 transition-all hover:bg-white/30` +
              (id == i + 1 ? " bg-white/30" : "")
            }
          >
            {i + 1}
          </Link>
        ))}
        <Link
          href={`/quiz/${quizId}/result`}
          className="grid h-12 place-items-center rounded-lg border border-white/50 px-4 transition-all hover:bg-white/30"
        >
          Submit
        </Link>
      </section>
    </main>
  );
}

function MediaRenderer({ base64Data }) {
  if (!base64Data) return null;

  const [mimeType, _] = base64Data.match(/^data:(.*);base64,(.*)$/).slice(1);

  if (mimeType.startsWith("image/")) {
    return (
      <Image src={base64Data} alt="Uploaded Content" width={256} height={256} />
    );
  } else if (mimeType.startsWith("video/")) {
    return (
      <video src={base64Data} width={256} height={256} controls>
        Your browser does not support HTML5 video.
      </video>
    );
  } else if (mimeType.startsWith("audio/")) {
    return (
      <audio controls>
        <source src={base64Data} type={mimeType} />
        Your browser does not support the audio element.
      </audio>
    );
  }

  // Handle unknown types
  return <p>Unsupported media type: {mimeType}</p>;
}
