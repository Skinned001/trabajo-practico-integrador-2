import { UserModel } from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";

export const register = async (req, res) => {
    const { username, email, password, role, profile } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: hashedPassword,
            role: role,
            profile: profile
        });
        res.status(201).json({
            msg: "Usuario registrado correctamente",
            newUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const loginUser = await UserModel.findOne({ username: username });
        const validPassword = await comparePassword(password, loginUser.password);
        if (!validPassword) {
            return res.status(401).json("Credenciales invalidas");
        }
        const token = generateToken(loginUser);
        res.cookie("token", token, {
            hhtpOnly: true,
            maxAge: 1000 * 60 * 60,
        });
        return res.status(200).json({
            ok: true,
            msg: "Login exitoso",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al logearse",
        });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            ok: true,
            msg: "Logout exitoso"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al deslogear",
        });
    }
};

export const profile = async (req, res) => {
    try {
        const currentUser = req.userLogged;
        res.status(200).json({
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};

export const updateProfile = async (req, res) => {
    const userID = req.userLogged.id;
    const { first_name, last_name, biography, avatar_url, birthday } = req.body;
    try {
        const userProfile = await ProfileModel.findOne({
            where: { user_id: userID },
        });
        if (!userProfile) {
            return res.status(404).json({
                message: "No se encontró el perfil",
                error: "Not found",
                status: 404,
            });
        }
        await userProfile.update(req.body);
        res.status(200).json(req.body);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};