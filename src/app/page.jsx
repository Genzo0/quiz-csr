"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [quizzes, setQuizzes] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getQuizzes = async () => {
      const res = await fetch("/api/quizzes");
      const { data } = await res.json();
      setQuizzes(data);
      setLoading(false);
    };
    getQuizzes();
  }, []);

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
          Quiz App
        </h1>
        <h2 className="lg:text-3xl">
          Play and test your abilities by selecting quizzes below.
        </h2>
      </section>
      <section>
        <ul>
          {quizzes.map((quiz) => (
            <Link href={`/quiz/${quiz._id}`} key={quiz._id}>
              <li className="mb-6 flex cursor-pointer items-center justify-between rounded-3xl bg-white/20 p-4 transition-all hover:bg-white/30 lg:p-8">
                <div>
                  <h4 className="mb-1 text-lg lg:text-2xl">{quiz.title}</h4>
                  <p className="text-sm lg:text-base">{quiz.description}</p>
                </div>
                <p className="text-2xl">&gt;</p>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </main>
  );
}
