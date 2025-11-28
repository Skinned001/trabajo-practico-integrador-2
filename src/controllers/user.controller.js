import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await UserModel.create({
            username,
            email,
            password
        });
        res.status(201).json({
            msg: "Nuevo usuario creado",
            newUser,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};

export const getAllUsers = async (req, res) => {
  try {
    const listAll = await UserModel.find().populate("article");
    res.status(200).json({
      msg: "Listando usuarios con sus artículos",
      listAll,
    });
  } catch (error) {
    return res.status(500).json("Error al listar el usuario " + error);
  }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);
        res.status(200).json({
            ok: true,
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status({
            ok: false,
            msg: "Error en el servidor",
        });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role, profile } = req.body;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                username,
                email,
                password,
                role,
                profile
            },
            { new: true }
        );
        res.status(200).json({
            ok: true,
            msg: "Usuario actualizado correctamente",
            data: updatedUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al actualizar usuario",
        });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                deletedAt: Date.now(),
            },
            { new: true }
        );
        res.status(200).json({
            msg: "Usuario eliminado correctamente",
            deletedUser,
        });
    } catch (error) {
        return res.status(500).json("Error al eliminar usuario " + error);
    }
};