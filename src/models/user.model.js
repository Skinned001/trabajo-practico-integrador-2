import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 20
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Formato de email inválido"]
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        profile: {
            firstName: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            },
            lastName: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            },
            biography: {
                type: String,
                maxlength: 500
            },
            avatarUrl: {
                type: String,
                match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/, "Formato de URL inválido"]
            },
            birthDate: {
                type: Date
            }
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date
        }
    },
    {
        versionKey: false
    }
);

userSchema.virtual("article", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
});

userSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "author"
  }
)

export const UserModel = model("User", userSchema);
