import { Router } from "express";
import {
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";
import { authAdmin } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validator } from "../middlewares/validator.js";
import {
    createTagValidations,
    findTagIDValidations,
    updateTagValidations,
    deleteTagValidations,
} from "../middlewares/validations/tag.validations.js";

export const tagRoutes = Router();

tagRoutes.post("/tags", authMiddleware, authAdmin, validator, createTagValidations, createTag);

tagRoutes.get("/tags", authMiddleware, authAdmin, validator, getAllTags);

tagRoutes.get("/tags/:id", authMiddleware, authAdmin, validator, findTagIDValidations, getTagById);

tagRoutes.put("/tags/:id", authMiddleware, authAdmin, validator, updateTagValidations, updateTag);

tagRoutes.delete("/tags/:id", authMiddleware, authAdmin, validator, deleteTagValidations, deleteTag);
