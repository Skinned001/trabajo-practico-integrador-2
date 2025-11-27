import { model, Schema } from "mongoose";

const tagSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 2,
            maxlength: 30,
            match: [/^\S+$/, "El nombre no puede contener espacios"]
        },
        description: {
            type: String,
            maxlength: 200
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        deletedAt: {
            type: Date,
            required: null,
        }
    },
    {
        versionKey: false
    }
);

export const TagModel = model("Tag", tagSchema);
