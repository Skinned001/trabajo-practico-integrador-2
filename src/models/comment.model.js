import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 500
        },
        author: {
            type: Types.ObjectId,
            ref: "User",
            required: true
        },
        article: {
            type: Types.ObjectId,
            ref: "Article",
            required: true
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    },
    {
        versionKey: false
    }
);

export const CommentModel = model("Comment", commentSchema);
