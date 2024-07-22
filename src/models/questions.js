import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    question: String,
    options: {
      a: String,
      b: String,
      c: String,
      d: String,
      e: {
        type: String,
        default: "Not Attempted",
        required: true,
      },
    },
    answer: {
      type: String,
      enum: ["a", "b", "c", "d"],
      required: true,
    },
    timer: {type:Number,default:3},
    for: [
      {
        type: Types.ObjectId,
        ref: "Quiz",
        required:true
      },
    ],

    users: [
      {
        id: {
          type: Types.ObjectId,
          ref: "User",
        },
        result: {
          type: String,
          default: "Number",
          enum: ["Wrong", "Right", "Not Attempted"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }
    ],
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdDate: [],
  },
  { timestamps: true }
);

export const Question = mongoose.models.Question || model("Question", schema);
