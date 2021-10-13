"use strict"

const { response } = require("express")
let imageFlipContentService=require("../service/imageFlipContentService")

/**
 * @swagger
 *   tags:
 *     name: Image Flip
 *     description: API to manage image flip.
 */

module.exports={
      /**
   * @swagger
   * /api/v1/imageFlipContent/categories:
   *   get:
   *     tags: [Image Flip]
   *     summary: Get image flip category.
   *     responses:
   *       200:
   *         description: All image flip categories are fetched.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: number
   *                       categoryTitle:
   *                         type: string
   *                       moduleId:
   *                         type: number
   *                       status:
   *                         type: boolean
   *       401:
   *         description: Invalid token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *                 error :
   *                   type: string
   */
    getAllImageFlipCategories:async(req,res,next)=>{
        try{
                let response=await imageFlipContentService.getAllImageFlipCategories()
                res.status(response.status).send(response)
        }
        catch(err)
        {
            next(err)
        }
    },

    createImageFlipContent:async(req,res,next)=>{

        try{
                let response=await imageFlipContentService.createImageFlipContent(req.body,req.user)
                res.status(response.status).send(response)
        }
        catch(err)
        {
            next(err)
        }
    },

    getAllImageFlipContent:async(req,res,next)=>{
        try{
                    let response=await imageFlipContentService.getAllImageFlipContent()
                    res.status(response.status).send(response)
        }
        catch(err)
        {
            next(err)

        }

    },

    getImageFlipContentById:async(req,res,next)=>{
        try{
            let id=req.params.id
            let response=await imageFlipContentService.getImageFlipContentById(id)
            res.status(response.status).send(response)
        }

        
        catch(err)
        {
            next(err)
        }
    },

    deleteImageFlipContentById:async(req,res,next)=>{
        try{
            let id=req.params.id
            console.log(id)
            let response=await imageFlipContentService.deleteImageFlipContentById(id)
            res.status(response.status).send(response)
        }
        catch(err)
        {
            next(err)
        }
    },

    updateImageFlipContentById:async(req,res,next)=>{
        try{
                let id=req.params.id
                let response=await imageFlipContentService.updateImageFlipContentById(id,req.body,req.user)
                res.status(response.status).send(response)
        }
        catch(err)
        {
            next(err)
        }
    }
}