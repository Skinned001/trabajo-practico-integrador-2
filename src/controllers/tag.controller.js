import { TagModel } from "../models/tag.model.js";


export const createTag = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newTag = await TagModel.create({
            name,
            description
        });
        res.status(201).json({
            msg: "Nueva Tag creada",
            newTag,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export const getAllTags = async (req, res) => {
    try {
        const tags = await TagModel.find({ $ne: { deletedAt } }).populate("user");
        res.status(200).json({
            ok: true,
            data: tags,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export const getTagById = async (req, res) => {
    const { id } = req.params;

    try {
        const tag = await TagModel.findById(id);

        res.status(200).json({
            oK: true,
            data: tag,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export const updateTag = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const updatedTag = await TagModel.findByIdAndUpdate(
            id,
            {
                name,
                description,
            },
            { new: true }
        );

        res.status(200).json({
            ok: true,
            msg: "Tag actualizada correctamente",
            data: updatedTag,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export const deleteTag = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTag = await TagModel.findByIdAndDelete(id);
        await ArticleModel.updateMany({ tags: id }, { $pull: { tags: id } });
        res.status(200).json({
            msg: "Etiqueta eliminada y removida de sus artículos anteriores",
            deletedTag,
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: "Error al elimnar etiquetas",
        });
    }
};