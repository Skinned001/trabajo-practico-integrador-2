import { ArticleModel } from "../models/article.model.js";
import { CommentModel } from "../models/comment.model.js";


export const createArticle = async (req, res) => {
    const { title, content, excerpt, status, author, tags } = req.body;

    try {
        const newArticle = new ArticleModel({
            title,
            content,
            excerpt,
            status,
            author,
            tags
        });
        const savedArticle = await newArticle.save();
        res.status(201).json({
            ok: true,
            msg: "Artículo creado correctamente",
            data: savedArticle
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};

export const getAllArticles = async (req, res) => {
    try {
        const listAll = await ArticleModel.find();
        res.status(200).json({
            msg: "Listando todos los artículos",
            listAll,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};

export const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const articleID = await ArticleModel.findById(id);
        res.status(200).json({
            msg: "Artículo encontrado",
            articleID,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};
export const myArticles = async (req, res) => {
    try {
        const listMyArticles = await ArticleModel.find({
            author: req.userLogged.id,
        });
        res.status(200).json({
            msg: "Listando sus artículos",
            listMyArticles,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del sssservidor"
        });
    }
};

export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content, excerpt, status, author, tags } = req.body;
    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            id,
            {
                title,
                content,
                excerpt,
                status,
                author,
                tags,
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            msg: "Actualizado artículo",
            updatedArticle,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};

export const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedArticle = await ArticleModel.findByIdAndDelete(id);
        await CommentModel.deleteMany({ article: id });
        res.status(200).json({
            msg: "Artículo y comentarios pertenecientes eliminados",
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};