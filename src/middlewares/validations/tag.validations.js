import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const createTagValidations = [
    body("name")
        .notEmpty()
        .withMessage("El campo name es obligatorio")
        .trim()
        .isLength({ min: 2, max: 30 })
        .custom(async (value) => {
            const tagExists = await TagModel.findOne({ name: value });
            if (tagExists) {
                throw new Error("Ese tag ya existe");
            }
        }),
    body("description")
        .notEmpty().withMessage("El campo description es obligatorio")
        .isLength({ max: 200 })
        .withMessage("El máximo de caracteres es 200"),
];

export const findTagIDValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const tag = await TagModel.findById(value);
            if (!tag) {
                throw new Error("La etiqueta no existe");
            }
        }),
];

export const updateTagValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const tag = await TagModel.findById(value);
            if (!tag) {
                throw new Error("La etiqueta no existe");
            }
        }),
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 30 })
        .custom(async (value) => {
            const tagExists = await TagModel.findOne({ name: value });
            if (tagExists) {
                throw new Error("Ese tag ya existe");
            }
        }),
    body("description")
        .optional()
        .isLength({ max: 200 })
        .withMessage("El máximo de caracteres es 200"),
];

export const deleteTagValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const tag = await TagModel.findById(value);
            if (!tag) {
                throw new Error("La etiqueta no existe");
            }
        }),
];