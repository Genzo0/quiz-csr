import connectDB from "@/lib/db";
import quizModel from "@/models/quizModel";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default function AddQuiz() {
  const action = async (formData) => {
    "use server";

    const title = formData.get("title");
    const description = formData.get("description");

    await connectDB();
    const quiz = await quizModel.create({ title, description });

    cookies().set("toast", "Quiz added successfully.", {
      expires: new Date(Date.now() + 3 * 1000), // 3 seconds
    });
    revalidatePath(`/quiz/${quiz._id}`);
  };

  const toastMsg = cookies().get("toast");

  return (
    <main className="p-5 lg:p-16">
      <section className="mb-4 lg:mb-8">
        <h1 className="mb-2 text-4xl font-semibold lg:mb-4 lg:text-7xl">
          Add New Quiz
        </h1>
      </section>
      <form action={action}>
        <label htmlFor="title" className="mb-2 block text-xl lg:text-2xl">
          Quiz Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Quiz Title"
          className="text-md mb-4 w-full rounded-3xl bg-white/30 p-4 lg:text-xl"
        />
        <label htmlFor="description" className="mb-2 block text-xl lg:text-2xl">
          Quiz Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={7}
          placeholder="Quiz Description"
          className="text-md mb-4 w-full rounded-3xl bg-white/30 p-4 lg:text-xl"
        />
        <button
          type="submit"
          className="rounded-xl bg-white/30 px-4 py-2 transition-colors hover:bg-white/50"
        >
          Submit
        </button>
        {toastMsg && <span className="ml-4">{toastMsg.value}</span>}
      </form>
    </main>
  );
}
