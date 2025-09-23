import { Router } from "express";
import { userRoutes } from "./user.route.js";
import { tagRoutes } from "./tag.route.js";
import { commentRoutes } from "./comment.route.js";
import { articleRoutes } from "./article.model.js";

export const routes = Router();

routes.use(userRoutes);
routes.use(tagRoutes);
routes.use(commentRoutes);
routes.use(articleRoutes);