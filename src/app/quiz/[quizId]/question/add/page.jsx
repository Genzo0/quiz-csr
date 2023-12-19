"use server";

import connectDB from "@/lib/db";
import quizModel from "@/models/quizModel";
import { cookies } from "next/headers";
import Form from "./Form";

export default async function AddQueston({ params }) {
  await connectDB();
  const quiz = await quizModel.findById(params.quizId).exec();

  const toastMsg = cookies().get("toast");

  return (
    <main className="p-5 lg:p-16">
      <section className="mb-4 lg:mb-8">
        <h1 className="mb-2 text-4xl font-semibold lg:mb-4 lg:text-7xl">
          Add New Question
        </h1>
        <h2 className="lg:text-3xl">Quiz: {quiz.title}</h2>
      </section>
      <Form quizId={params.quizId} />
      {toastMsg && (
        <div className="fixed bottom-0 right-0 m-4 rounded-xl bg-green-500/50 p-4">
          {toastMsg.value}
        </div>
      )}
    </main>
  );
}
