import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/db";
import quizModel from "@/models/quizModel";

export async function GET(request) {
  const quizId = request.url.slice(request.url.lastIndexOf("/") + 1);
  await connectDB();
  const data = await quizModel.findById(quizId).exec();

  return NextResponse.json({ data });
}
