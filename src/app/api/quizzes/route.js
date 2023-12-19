import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import quizModel from "@/models/quizModel";

export async function GET() {
  await connectDB();
  const data = await quizModel.find({});

  return NextResponse.json({ data });
}
