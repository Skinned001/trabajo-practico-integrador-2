import { Router } from "express";
import { userRoutes } from "./user.route.js";
import { tagRoutes } from "./tag.route.js";
import { commentRoutes } from "./comment.route.js";
import { articleRoutes } from "./article.route.js";
import { authRoutes } from "./auth.route.js";
import { articleTagRoutes } from "./articleTag.route.js";

export const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(tagRoutes);
routes.use(articleTagRoutes);
routes.use(commentRoutes);
routes.use(articleRoutes);