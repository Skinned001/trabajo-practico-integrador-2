import { CommentModel } from "../models/comment.model.js";

export const createComment = async (req, res) => {
    const { content, author, article } = req.body;
    try {
        const newComment = await CommentModel.create({
            content,
            author,
            article,
        });
        res.status(201).json({
            ok: true,
            msg: "Comment creado correctamente",
            newComment,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find().populate("user");
        res.status(200).json({
            ok: true,
            data: comments,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export const getCommentsFromArticle = async (req, res) => {
    const { articleID } = req.params;
    try {
        const comments = await CommentModel.find({
            article: articleID,
        }).populate("author", "-password -email -createdAt -__v");
        res.status(200).json({
            ok: true,
            msg: "Comentarios de un artículo y su autor",
            comments,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al mostrar comenantarios",
        });
    }
};

export const getMyComments = async (req, res) => {
    try {
        const ownComments = await CommentModel.find({ author: req.userLogged.id });
        res.status(200).json({
            msg: "Listando mis comentarios",
            ownComments,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error al mostrar comentarios propios"
        })
    }
};


export const getCommentById = async (req, res) => {
    const { id } = req.params;
    const { content, author, article } = req.body;
    try {
        const comment = await CommentModel.findById(id);

        res.status(200).json({
            ok: true,
            data: comment,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content, author, article } = req.body;
    try {
        const updatedComment = await CommentModel.findByIdAndUpdate(
            id,
            {
                content,
                author,
                article,
            },
            { new: true }
        );
        res.status(200).json({
            ok: true,
            msg: "Comenatario actualizado correctamente",
            data: updatedComment,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedComment = await CommentModel.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: "Comentario borrado correctamente",
            data: deletedComment,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};