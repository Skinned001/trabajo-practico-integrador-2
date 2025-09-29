import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";

export const createArticleValidations = [
    body("title")
        .notEmpty()
        .withMessage("El title es obligatorio")
        .isLength({ min: 3, max: 200 })
        .withMessage("Se requiere un mínimo de 3 caracteres y máximo de 200"),
    body("content")
        .notEmpty()
        .withMessage("El content es obligatorio")
        .isLength({ min: 50 })
        .withMessage("El máximo de caracteres es 50"),
    body("excerpt")
        .optional()
        .isLength({ max: 500 })
        .withMessage("El mínimo de caracteres es 500"),
    body("status")
        .notEmpty()
        .withMessage("El status es obligatorio")
        .custom(async (value) => {
            const admittedStatuses = ["published", "archived"];
            if (!admittedStatuses.includes(value)) {
                throw new Error("Solo se permiten los valores published o archived");
            }
        }),
    body("author")
        .isMongoId()
        .withMessage("Author debe ser un ObjectId, de formato ID de MongoDB"),
];

export const findArticleIDValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const article = await ArticleModel.findById(value);
            if (!article) {
                throw new Error("El artículo no existe");
            }
        }),
];

export const updateArticleValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const article = await ArticleModel.findById(value);
            if (!article) {
                throw new Error("El artículo no existe");
            }
        }),
    body("title")
        .optional()
        .isLength({ min: 3, max: 200 })
        .withMessage("Se requiere un mínimo de 3 caracteres y máximo de 200"),
    body("content")
        .optional()
        .isLength({ min: 50 })
        .withMessage("El máximo de caracteres es 50"),
    body("excerpt")
        .optional()
        .isLength({ max: 500 })
        .withMessage("El mínimo de caracteres es 500"),
    body("status")
        .optional()
        .custom(async (value) => {
            const admittedStatuses = ["published", "archived"];
            if (!admittedStatuses.includes(value)) {
                throw new Error("Solo se permiten los valores published o archived");
            }
        }),
    body("author")
        .optional()
        .isMongoId()
        .withMessage("Author debe ser un ObjectId, de formato ID de MongoDB"),
];

export const deletedArticleValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const article = await ArticleModel.findById(value);
            if (!article) {
                throw new Error("El artículo no existe");
            }
        }),
];