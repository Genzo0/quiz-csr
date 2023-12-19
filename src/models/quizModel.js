import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      title: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      answers: [
        {
          type: Number,
          required: true,
        },
      ],
      attachment: {
        type: String,
        required: false,
      },
    },
  ],
});

export default mongoose.models.Quiz || mongoose.model("Quiz", schema);
