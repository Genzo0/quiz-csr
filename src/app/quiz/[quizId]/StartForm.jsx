"use client";

import { clearStorageAnswers } from "@/lib/localStorage";
import { useRouter } from "next/navigation";

export default function StartForm({ quizId }) {
  const { push } = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    clearStorageAnswers(quizId);
    localStorage.setItem("name", e.target[0].value);
    push(`/quiz/${quizId}/question/1`);
  };

  return (
    <form className="flex gap-4" onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        className="grow rounded-3xl bg-white/30 px-8"
        placeholder="Your name"
        required
      />
      <button
        type="submit"
        className="rounded-3xl bg-green-500/60 px-12 py-4 text-center transition-colors hover:bg-green-500/80"
      >
        Start Quiz
      </button>
    </form>
  );
}
