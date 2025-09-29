import { Router } from "express";
import {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
} from "../controllers/comment.controller.js";
import { authAdmin } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validator } from "../middlewares/validator.js";
//import validations

export const commentRoutes = Router();

commentRoutes.post("/comments", authMiddleware, authAdmin, validator, createComment);

commentRoutes.get("/comments", authMiddleware, authAdmin, validator, getAllComments);

commentRoutes.get("/comments/:id", authMiddleware, authAdmin, validator, getCommentById);

commentRoutes.put("/comments/:id", authMiddleware, authAdmin, validator, updateComment);

commentRoutes.delete("/comments/:id", authMiddleware, authAdmin, validator, deleteComment);
