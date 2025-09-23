import { Router } from "express";
import {
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";

export const tagRoutes = Router();

tagRoutes.post("/tags", createTag);
tagRoutes.get("/tags", getAllTags);
tagRoutes.get("/tags/:id", getTagById);
tagRoutes.put("/tags/:id", updateTag);
tagRoutes.delete("/tags/:id", deleteTag);
