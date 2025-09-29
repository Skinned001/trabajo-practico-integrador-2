import { Router } from "express";
import {
    register,
    login,
    logout,
    profile,
    updateProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validator } from "../middlewares/validator.js";
// import {
//     createUserValidations,
//     updateProfileValidations,
// } from "../middlewares/validations/user.validations.js";

export const authRoutes = Router();

authRoutes.post("/auth/register", validator, register);

authRoutes.post("/auth/login", login);

authRoutes.post("/auth/logout", logout);

authRoutes.get("/auth/profile", authMiddleware, profile);

authRoutes.put("/auth/profile", authMiddleware, validator, updateProfile);