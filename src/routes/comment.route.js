import { Router } from "express";
import {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
} from "../controllers/tag.controller.js";

export const commentRoutes = Router();

commentRoutes.post("/comments", createComment);
commentRoutes.get("/comments", getAllComments);
commentRoutes.get("/comments/:id", getCommentById);
commentRoutes.put("/comments/:id", updateComment);
commentRoutes.delete("/comments/:id", deleteComment);
