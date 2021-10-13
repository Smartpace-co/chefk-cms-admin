"use strict"

const imageDragDropService=require("../service/imageDragDropService")

/**
 * @swagger
 *   tags:
 *     name: Image Drag Drop
 *     description: API to manage image drag drop.
 */

module.exports={
      /**
   * @swagger
   * /api/v1/imageDragDrop/categories:
   *   get:
   *     tags: [Image Drag Drop]
   *     summary: Get image drag drop category.
   *     responses:
   *       200:
   *         description: All image drag drop categories are fetched.
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
    getAllImageDragDropCategories:async(req,res,next)=>{
        try{
                let response=await imageDragDropService.getAllImageDragDropCategories()
                res.status(response.status).send(response)
        }
        catch(err)
        {
            next(err)
        }
    },
    
    createImageDragDrop:async(req,res,next)=>{
        try{
            let response=await imageDragDropService.createImageDragDrop(req.body,req.user)
            res.status(response.status).send(response)

        }
        catch(err){
            next(err)
        }
    },

    getAllImageDragDrop:async(req,res,next)=>{
        try{
            let response=await imageDragDropService.getAllImageDragDrop()
            res.status(response.status).send(response)
        }
        catch(err)
        {
            next(err)
        }
    },

    getImageDragDrop:async(req,res,next)=>{
        try{
            let id=req.params.id
                let response=await imageDragDropService.getImageDragDrop(id)
                res.status(response.status).send(response)

        }
        catch(err)
        {
            next(err)
        }
    },
    deleteImageDragDrop:async(req,res,next)=>{
        try{
            let id=req.params.id
                let response=await imageDragDropService.deleteImageDragDrop(id)
                res.status(response.status).send(response)

        }
        catch(err)
        {
            next(err)
        }
    },
    updateImageDragDrop: async (req, res, next) => {
        try {
          let id = req.params.id;
          let response = await imageDragDropService.updateImageDragDrop(
            req.body,
            req.user,
            id
          );
          res.status(response.status).send(response);
        } catch (err) {
          next(err);
        }
      },
    

}