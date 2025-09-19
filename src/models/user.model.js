import { model, Schema, Types } from "mongoose";

const userSchema = new Schema(
    {
        id: {

        },
        username: {

        },
        email: {

        },
        password: {

        },
        role: {

        },
        profile: [{

        }],
        createdAt: {

        },
        updatedAt: {

        },
    },
    {
        versionKey: false
    }
);

export const UserModel = model("User", userSchema);
