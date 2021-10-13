"use strict"

const discussionforumService = require("../service/discussionforumService")

module.exports = {

    createDiscussionforum: async (req, res, next) => {
        try {
            let response = await discussionforumService.createDiscussionforum(req.body, req.user)
            res.status(response.status).send(response)
        }
        catch (err) {
            next(err)
        }
    },


    getAllDiscussionforum: async (req, res, next) => {
        try {
            let response = await discussionforumService.getAllDiscussionforum()
            res.status(response.status).send(response)
        }
        catch (err) {
            next(err)
        }
    },

    getDiscussionforumById: async (req, res, next) => {
        try {
            let id = req.params.id
            let response = await discussionforumService.getDiscussionforumById(id)
            res.status(response.status).send(response)
        }
        catch (err) {

        }
    },
    deleteDiscussionforum: async (req, res, next) => {
        try {
            let id = req.params.id
            console.log(id)
            let response = await discussionforumService.deleteDiscussionforum(id,req.body,req.user)
            res.status(response.status).send(response)
        }
        catch (err) {

        }
    },
    updateDiscussionforum: async (req, res, next) => {
        try {
            let id = req.params.id
            let response = await discussionforumService.updateDiscussionforum(id, req.body, req.user)
            res.status(response.status).send(response)
        }
        catch (err) {

        }
    }
}