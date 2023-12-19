"use client";

import { useState } from "react";
import formAction from "./formAction";

export default function Form({ quizId }) {
  const [answers, setAnswers] = useState([
    {
      title: "",
      correct: false,
    },
  ]);
  const [response, setResponse] = useState("");

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const res = await formAction(new FormData(event.target), quizId);
        setResponse(res);
      }}
    >
      <label htmlFor="title" className="mb-2 block text-xl lg:text-2xl">
        Question Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Question Title"
        className="text-md mb-4 w-full rounded-3xl bg-white/30 p-4 lg:text-xl"
      />
      <label htmlFor="attachment" className="mb-2 block text-xl lg:text-2xl">
        Question Attachment
      </label>
      <input
        id="attachment"
        name="attachment"
        type="file"
        accept="image/*,video/*,audio/*"
        placeholder="Question Attachment"
        className="text-md mb-4 w-full rounded-3xl bg-white/30 p-4 file:border-transparent file:rounded-xl"
      />
      <label htmlFor="answers" className="mb-2 block text-xl lg:text-2xl">
        Answers
      </label>
      {answers.map((answer, i) => (
        <div key={i} className="text-md mb-2 flex gap-2">
          <input
            name={`answer-${i}`}
            type="text"
            value={answer.title}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[i].title = e.target.value;
              setAnswers(newAnswers);
            }}
            placeholder={`Answer ${i + 1}`}
            className="grow rounded-3xl bg-white/30 p-4 lg:text-xl"
          />
          <button
            type="button"
            onClick={() => {
              const newAnswers = [...answers];
              newAnswers.splice(i, 1);
              setAnswers(newAnswers);
            }}
            className="w-16 rounded-3xl bg-red-500/40 transition-colors hover:bg-red-500/50"
          >
            X
          </button>
          <div className="flex items-center rounded-3xl bg-white/30 px-4">
            <input
              id={`correct-${i}`}
              name={`correct-${i}`}
              type="checkbox"
              checked={answer.correct}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[i].correct = e.target.checked;
                setAnswers(newAnswers);
              }}
            />
            <label htmlFor={`correct-${i}`} className="ml-2">
              Correct Answer
            </label>
          </div>
        </div>
      ))}
      <div className="mb-8">
        <button
          type="button"
          onClick={() =>
            setAnswers((curr) => [...curr, { title: "", correct: false }])
          }
          className="h-12 w-12 rounded-3xl bg-white/30 transition-colors hover:bg-white/50"
        >
          +
        </button>
      </div>
      <button
        type="submit"
        className="rounded-xl bg-white/30 px-4 py-2 transition-colors hover:bg-white/50"
      >
        Submit
      </button>
      <span className="ml-2">{response}</span>
    </form>
  );
}
