"use strict"

let healthHygieneService = require("../service/healthHygieneService")

module.exports = {

    createHealthHygiene: async (req, res, next) => {
        try {
            let response = await healthHygieneService.createHealthHygiene(req.body, req.user)
            res.status(response.status).send(response)
        }
        catch (err) {
            next(err)
        }
    },

    getAllHealthHygiene: async (req, res, next) => {
        try {

            let response = await healthHygieneService.getAllHealthHygiene()
            res.status(response.status).send(response)
        }
        catch (err) {
            next(err)
        }
    },

    getHealthHygiene: async (req, res, next) => {
        try {
            let id = req.params.id
            let response = await healthHygieneService.getHealthHygiene(id)
            res.status(response.status).send(response)
        }
        catch (err) {
            next(err)
        }
    },

    deleteHealthHygiene: async (req, res, next) => {
        try {
            let id = req.params.id
            let response = await healthHygieneService.deleteHealthHygiene(id)
            res.status(response.status).send(response)
        }
        catch (err) {
            next(err)
        }
    },

    updateHealthHygiene:async(req,res,next)=>{
        try{
                let id=req.params.id
                let response=await healthHygieneService.updateHealthHygiene(id,req.body,req.user)
                res.status(response.status).send(response)
        }
        catch(err)
        {
            next(err)
        }
    }


}