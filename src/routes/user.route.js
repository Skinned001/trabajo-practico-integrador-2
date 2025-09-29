import { Router } from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";
import { authAdmin } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validator } from "../middlewares/validator.js";

export const userRoutes = Router();

userRoutes.post("/users", authMiddleware, authAdmin, createUser);

userRoutes.get("/users", authMiddleware, authAdmin, getAllUsers);

userRoutes.get("/users/:id", authMiddleware, authAdmin, validator, getUserById);

userRoutes.put("/users/:id", authMiddleware, authAdmin, validator, updateUser);

userRoutes.delete("/users/:id", authMiddleware, authAdmin, validator, deleteUser);

