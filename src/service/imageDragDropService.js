"use strict"
let Category = require("../models").categories
let ImageDragDrop = require("../models").image_drag_drops
let utils = require("../helpers/utils")
let { StatusCodes } = require("http-status-codes")
let modelHelper = require("../helpers/modelHelper");

const Image = require("../models").images;
const moduleKey ="imageDragDrop";
const ModuleMaster = require("../models").module_master;

module.exports = {

    getAllImageDragDropCategories: async () => {
        try {
            const moduleDetails = await ModuleMaster.findOne({
                where: { moduleKey: "imageDragDrop" },
                attributes: ["id"]
            });
            const data = await Category.findAll({ where: { moduleId: moduleDetails.id } });
            return utils.responseGenerator(StatusCodes.OK, "All image drag drop categories fetched successfully", data);
        }
        catch (err) {
            next(err)
        }
    },

    createImageDragDrop: async (reqBody, reqUser) => {
        let savedImages;
        try {
            reqBody.createdBy = reqUser.id
            const moduleDetails = await ModuleMaster.findOne({
                where: { moduleKey: moduleKey },
                attributes: ["id"]
            });
            
            let saveImageDragDrop = await ImageDragDrop.create(reqBody)
            // Upsert image data
            if(reqBody.images)
            {
                savedImages = await modelHelper.upsertImageData(
                    reqBody.images,
                    saveImageDragDrop.id,
                    moduleDetails,
                    reqUser
                ); 
                return utils.responseGenerator(StatusCodes.OK, "Image Drag And Drop Game Content Saved Successfully",
                {
                    ...saveImageDragDrop.dataValues,
                    ...{
                        images: savedImages.map((m) => {
                            return {
                                id: m.id,
                                image: m.image,
                            };
                        }),
                    }
                });

            }

            return utils.responseGenerator(StatusCodes.OK, "Image Drag And Drop Game Content Saved Successfully",
                {
                    ...saveImageDragDrop.dataValues
                    
                });

           
        }
        catch (err) {
            next(err)
        }

    },

    getAllImageDragDrop: async () => {
        try {
            let dragDropDetails = await ImageDragDrop.findAll({
                attributes: [
                    "id",
                    "title",                  
                    "status",
                ]
            })

            return utils.responseGenerator(StatusCodes.OK, "All Image drag drop fetched successfully", dragDropDetails)

        }
        catch (err) {
            next(err)
        }

    },
    getImageDragDrop: async (id) => {
        const moduleDetails = await ModuleMaster.findOne({
            where: { moduleKey: moduleKey },
            attributes: ["id"]
        });
        let dragDropDetails = await ImageDragDrop.findOne({
            where: {
                id: id
            },
            include: [
            {
                model: Image,
                attributes: ["id", "image"],
                required: false,
                where:{
                    transactionId:id,
                    moduleId:moduleDetails.id,
                   
                    
                }
            }]
        })

        return utils.responseGenerator(StatusCodes.OK, "Image drag drop fetched successfully", dragDropDetails)
    },
    deleteImageDragDrop: async (id) => {

        let dragDropDetails = await ImageDragDrop.destroy({
            where: {
                id: id
            }
        })
        return utils.responseGenerator(StatusCodes.OK, "Image drag drop deleted successfully", dragDropDetails)
    },
    updateImageDragDrop: async (reqBody, reqUser, id) => {
        try {
            const moduleDetails = await ModuleMaster.findOne({
                where: { moduleKey: moduleKey },
                attributes: ["id"],
            });
            let imageDragDropDetails = await ImageDragDrop.findOne({
                where: {
                    id: id
                }
            });
            if (!imageDragDropDetails) {
                return utils.responseGenerator(
                    StatusCodes.NOT_FOUND,
                    "No image drag drop Exist"
                );
            }
            reqBody.updatedBy = reqUser.id;
            await ImageDragDrop.update(reqBody, { where: { id: id } });
            // Upsert image data
            let upsertImages = await modelHelper.upsertImageData(
                reqBody.images,
                id,
                moduleDetails,
                reqUser
            );

            return utils.responseGenerator(StatusCodes.OK, "Image drag drop updated successfully",{
                ...{
                    images: upsertImages.map((m) => {
                      return {
                        id: m.id,
                        image: m.image,
                      };
                    }),
                  }
            })

        }
        catch (err) {
            if (err instanceof UniqueConstraintError) {
                return utils.responseGenerator(
                    StatusCodes.CONFLICT,
                    "Image drag drop already exist"
                );
            } else if (err instanceof ForeignKeyConstraintError) {
                return utils.responseGenerator(
                    StatusCodes.NOT_FOUND,
                    "Image drag drop not exist"
                );
            }
            console.log("Error ==> ", err);
            throw err;
        }
    }

}