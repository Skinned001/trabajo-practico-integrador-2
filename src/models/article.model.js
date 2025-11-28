import { model, Schema, Types } from "mongoose";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      minlength: 50,
    },
    excerpt: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["published", "archived"],
      default: "published",
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tag",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

articleSchema.virtual("article", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
});

articleSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "author",
});

export const ArticleModel = model("Article", articleSchema);
