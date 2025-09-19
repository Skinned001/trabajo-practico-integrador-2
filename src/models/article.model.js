import { model, Schema } from "mongoose";

const articleSchema = new Schema(
    {
        id: {

        },
        title: {

        },
        content: {

        },
        excerpt: {

        },
        status: {

        },
        author: {

        },
        tags: {

        },
        createdAt: {

        },
        updatedAt: {

        },
    },
    {
        versionKey: false
    }
);

export const ArticleModel = model("Article", articleSchema);