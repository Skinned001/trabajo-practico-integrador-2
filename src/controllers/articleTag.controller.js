import { ArticleModel } from "../models/article.model.js";

export const addTagToArticle = async (req, res) => {
    const { articleId, tagId } = req.params;
    try {
        const addTag = await ArticleModel.findByIdAndUpdate(
            articleId,
            {
                $push: { tags: tagId },
            },
            { new: true }
        );
        res.status(200).json({
            msg: "Agregada etiqueta a Artículo",
            addTag,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};

export const removeTagFromArticle = async (req, res) => {
    const { articleId, tagId } = req.params;
    try {
        const removeTag = await ArticleModel.findByIdAndUpdate(
            articleId,
            {
                $pull: { tags: tagId },
            },
            { new: true }
        );
        res.status(200).json({
            msg: "Etiqueta removida",
            removeTag,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};