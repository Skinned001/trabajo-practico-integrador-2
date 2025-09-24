import { ArticleModel } from "../models/article.model.js";

import { ArticleModel } from "../models/article.model.js";

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
        // Si es un error de validación de Mongoose
        if (error.name === "ValidationError") {
            return res.status(400).json({
                ok: false,
                msg: "Error de validación",
                errors: error.errors
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};


export const getAllArticles = async (req,res) => {

};

export const getArticleById = async (req,res) => {

};

export const updateArticle = async (req,res) => {

};

export const deleteArticle = async (req,res) => {

};