
import { body, param } from "express-validator";
import { CommentModel } from "../../models/comment.model.js";
import { ArticleModel } from "../../models/article.model.js";

export const createCommentValidations = [
    body("content")
        .notEmpty()
        .withMessage("El campo content es obligatorio")
        .isLength({ min: 5, max: 500 })
        .withMessage("El mínimo requerido es de 5 caracteres, el máximo es de 500"),
    body("author")
        .isMongoId()
        .withMessage("El author debe ser un ObjectId de MongoDB"),
    body("article")
        .isMongoId()
        .withMessage("Article debe ser un ObjectId de MongoDB")
        .custom(async (value) => {
            const article = await ArticleModel.findOne({ id: value });
            if (!article) {
                throw new Error("Ese article no existe");
            }
        }),
];

export const findCommentIDValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const comment = await CommentModel.findById(value);
            if (!comment) {
                throw new Error("El comentario no existe");
            }
        }),
];

export const updateCommentValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const comment = await CommentModel.findById(value);
            if (!comment) {
                throw new Error("El comentario no existe");
            }
        }),
    body("content")
        .optional()
        .isLength({ min: 5, max: 500 })
        .withMessage("El mínimo requerido es de 5 caracteres, el máximo es de 500"),
    body("author")
        .optional()
        .isMongoId()
        .withMessage("El author debe ser un ObjectId de MongoDB"),
    body("article")
        .optional()
        .isMongoId()
        .withMessage("Article debe ser un ObjectId de MongoDB")
        .custom(async (value) => {
            const article = await ArticleModel.findOne({ id: value });
            if (!article) {
                throw new Error("Ese article no existe");
            }
        }),
];

export const deleteCommentValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const comment = await CommentModel.findById(value);
            if (!comment) {
                throw new Error("El comentario no existe");
            }
        }),
];
