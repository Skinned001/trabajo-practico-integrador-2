import { param, body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidations = [
    body("username")
        .notEmpty()
        .withMessage("El campo username no puede estar vacío")
        .isAlphanumeric()
        .withMessage("Solo se admiten caracteres alfanuméricos")
        .isLength({ min: 3, max: 20 })
        .withMessage("Se requiere mínimo 3 caracteres y máximo 20")
        .custom(async (value) => {
            const userExists = await UserModel.findOne({ username: value });
            if (userExists) {
                throw new Error("Ese nombre de usuario ya existe");
            }
        }),
    body("email")
        .notEmpty()
        .withMessage("El campo email no puede estar vacío")
        .isEmail()
        .withMessage("El formato de email es ejemplo@mail.com")
        .custom(async (value) => {
            const emailExists = await UserModel.findOne({ email: value });
            if (emailExists) {
                throw new Error("Ese email ya está registrado");
            }
        }),
    body("password")
        .notEmpty()
        .withMessage("El campo password es obligatorio")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        })
        .withMessage(
            "La contraseña debe contener al menos una minúscula, una mayúscula y un número y además contener un mínimo de 8 caracteres"
        ),
    body("role")
        .optional()
        .isIn(["user", "admin"])
        .withMessage("El rol solo admite los valores admin o user"),
    body("profile.firstName")
        .notEmpty()
        .withMessage("El campo firstName es obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("Se requiere de mínimo 2 letras y máximo 50")
        .isAlpha()
        .withMessage("First name debe contener solo letras"),
    body("profile.lastName")
        .notEmpty()
        .withMessage("El campo lastName es obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("Se requiere de mínimo 2 letras y máximo 50")
        .isAlpha()
        .withMessage("Last name solo debe contener letras"),
    body("profile.biography")
        .optional()
        .isLength({ max: 500 })
        .withMessage("El máximo de caracteres es de 500"),
    body("profile.avatarUrl")
        .optional()
        .isURL()
        .withMessage("Formato inválido. Ingrese una URL válida"),
];

export const getUserIDValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const user = await UserModel.findById(value);
            if (!user) {
                throw new Error("El usuario no existe");
            }
        }),
];

export const updateUserValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const user = await UserModel.findById(value);
            if (!user) {
                throw new Error("El usuario no existe");
            }
        }),
    body("username")
        .optional()
        .isAlphanumeric()
        .withMessage("Solo se admiten caracteres alfanuméricos")
        .isLength({ min: 3, max: 20 })
        .withMessage("Se requiere mínimo 3 caracteres y máximo 20")
        .withMessage("Username debe ser alfanumérico")
        .custom(async (value) => {
            const userExists = await UserModel.findOne({ username: value });
            if (userExists) {
                throw new Error("Ese nombre de usuario ya existe");
            }
        }),
    body("email")
        .optional()
        .isEmail()
        .withMessage("El formato de email debe ser tuemail@mail.com")
        .custom(async (value) => {
            const emailExists = await UserModel.findOne({ email: value });
            if (emailExists) {
                throw new Error("Ese email ya está registrado");
            }
        }),
    body("password")
        .optional()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        })
        .withMessage(
            "La contraseña debe contener al menos una minúscula, una mayúscula y un número"
        ),
    body("role")
        .optional()
        .isIn(["user", "admin"])
        .withMessage("El rol solo admite los valores adminsdasd o user"),
    body("profile.firstName")
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage("Se requiere de mínimo 2 letras y máximo 50")
        .isAlpha()
        .withMessage("First name debe contener solo letras"),
    body("profile.lastName")
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage("Se requiere de mínimo 2 letras y máximo 50")
        .isAlpha()
        .withMessage("Last name solo debe contener letras"),
    body("profile.biography")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Máximo de caracteres: 500"),
    body("profile.avatarUrl")
        .optional()
        .isURL()
        .withMessage("Formato inválido. Ingrese una URL válida"),
];

export const updateProfileValidations = [
    body("profile.firstName")
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage("Se requiere de mínimo 2 letras y máximo 50")
        .isAlpha()
        .withMessage("First name debe contener solo letras"),
    body("profile.lastName")
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage("Se requiere de mínimo 2 letras y máximo 50")
        .isAlpha()
        .withMessage("Last name solo debe contener letras"),
    body("profile.biography")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Máximo de caracteres es de 500"),
    body("profile.avatarUrl")
        .optional()
        .isURL()
        .withMessage("Formato inválido. Ingrese una URL válida"),
]

export const deleteUserValidations = [
    param("id")
        .exists()
        .custom(async (value) => {
            const user = await UserModel.findById(value);
            if (!user) {
                throw new Error("El usuario no existe");
            }
        }),
];