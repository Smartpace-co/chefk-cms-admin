"use strict"

let conversationSentenceService = require("../service/conversationSentenceService")



module.exports = {

    createConversationSentence: async (req, res, next) => {

        try {
            let response = await conversationSentenceService.createConversationSentence(req.body, req.user)
            res.status(response.status).send(response)
        }
        catch (err) {
            next(err);
        }


    },

    getAllConversationSentence: async (req, res, next) => {
        try {

            let response = await conversationSentenceService.getAllConversationSentence()
            res.status(response.status).send(response)
            return response

        }
        catch (err) {
            next(err);

        }

    },

    getConversationSentence: async (req, res, next) => {
        try {
            let id = req.params.id
            let response = await conversationSentenceService.getConversationSentence(id);
            res.status(response.status).send(response)
        }
        catch (err) {
            next(err);
        }
    },

    deleteConversationSentence: async (req, res, next) => {
        try {
            let id = req.params.id
            let response = await conversationSentenceService.deleteConversationSentence(id)
            res.status(response.status).send(response)
        }
        catch (err) {
            next(err);
        }
    },

    updateConversationSentence: async (req, res, next) => {
        try {
            let id = req.params.id;
            let response = await conversationSentenceService.updateConversationSentence(
                req.body,
                req.user,
                id)
            res.status(response.status).send(response)

        }
        catch (err) {
            next(err);
        }
    }


}