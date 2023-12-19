"use client";

import { setStorageAnswer, getStorageAnswer } from "@/lib/localStorage";
import { useState } from "react";

export default function QuestionOptions({ options, quizId, id }) {
  const [answer, setAnswer] = useState(getStorageAnswer(quizId, id));

  const onClick = (i) => {
    setAnswer(i);
    setStorageAnswer(quizId, id, i);
  };

  return (
    <>
      {options.map((option, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          className={
            `text-md rounded-3xl text-center transition-all hover:bg-white/40 lg:p-4 lg:text-2xl ` +
            (answer === i ? "bg-white/50" : "bg-white/30")
          }
        >
          {option}
        </button>
      ))}
    </>
  );
}
