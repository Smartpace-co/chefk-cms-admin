"use strict"
let Category = require("../models").categories
let ImageFlipContent = require("../models").image_flip_contents
let utils = require("../helpers/utils")
let { StatusCodes } = require("http-status-codes")
const Image = require("../models").images;
const moduleKey = "imageFlipContent";
const ModuleMaster = require("../models").module_master;
let modelHelper = require("../helpers/modelHelper");

module.exports = {

    getAllImageFlipCategories: async () => {
        try {
            const moduleDetails = await ModuleMaster.findOne({
                where: { moduleKey: "imageFlipContent" },
                attributes: ["id"]
            });
            const data = await Category.findAll({ where: { moduleId: moduleDetails.id } });
            return utils.responseGenerator(StatusCodes.OK, "All image flip categories fetched successfully", data);
        }
        catch (err) {
            next(err)
        }
    },

    createImageFlipContent: async (reqBody, reqUser) => {

        try {
            reqBody.createdBy = reqUser.id
            const moduleDetails = await ModuleMaster.findOne({
                where: { moduleKey: moduleKey },
                attributes: ["id"]
            });
            let createDetails = await ImageFlipContent.create(reqBody)
            if(reqBody.images)
            {
            let savedImages = await modelHelper.upsertImageData(
                reqBody.images,
                createDetails.id,
                moduleDetails,
                reqUser
            );
            return utils.responseGenerator(StatusCodes.OK, "Image Flip Content Saved Successfully", {
                ...createDetails.dataValues,
                ...{
                    images: savedImages.map((m) => {
                        return {
                            id: m.id,
                            image: m.image,
                        };
                    }),
                }
            })
            }
                return utils.responseGenerator(StatusCodes.OK, "Image Flip Content Saved Successfully", {
                    ...createDetails.dataValues,
                })
            }
        catch (err) {
            next(err)
        }
    },

    getAllImageFlipContent: async () => {
        try {
            let getDetails = await ImageFlipContent.findAll({
                /*include: [

                    {
                        model: Image,
                        attributes: ["id", "image"],
                    }]*/
            })
            return utils.responseGenerator(StatusCodes.OK, "All Image Flip Content Fetched Successfully", getDetails)
        }
        catch (err) {
            next(err)
        }
    },

    getImageFlipContentById: async (id) => {
        try {
            const moduleDetails = await ModuleMaster.findOne({
                where: { moduleKey: moduleKey },
                attributes: ["id"]
            });
            let getDetailsById = await ImageFlipContent.findOne({
                where: {
                    id: id
                },
                include: [
                {
                    model: Image,
                    attributes: ["id", "image"],
                    required:false,
                    where:{
                        transactionId:id,
                        moduleId:moduleDetails.id
                    }
                  }]
            })
    
            return utils.responseGenerator(StatusCodes.OK, "Image Flip Content Fetched Successfully", getDetailsById)
        }
        catch (err) {
            next(err)
        }
    },

    deleteImageFlipContentById: async (id) => {
        try {



            let deleteDetails = await ImageFlipContent.destroy({
                where: {
                    id: id
                }
            })
            return utils.responseGenerator(StatusCodes.OK, "Image Flip Content Deleted Successfully", deleteDetails)
        }
        catch (err) {
            next(err)
        }
    },

    updateImageFlipContentById: async (id, reqBody, reqUser) => {
        try {
            reqBody.updatedBy = reqUser.id
            const moduleDetails = await ModuleMaster.findOne({
                where: { moduleKey: moduleKey },
                attributes: ["id"]
            });
            let updateId = await ImageFlipContent.findOne({
                where: {
                    id: id
                }
            })
            if (updateId) {
              
                let savedImages = await modelHelper.upsertImageData(
                    reqBody.images,
                    id,
                    moduleDetails,
                    reqUser
                );
                let updateDetails = await ImageFlipContent.update(reqBody, {
                    where: {
                        id: id
                    }
                })
                return utils.responseGenerator(StatusCodes.OK, "Image Flip Content Updated Successfully", {
                    ...updateDetails.dataValues,
                    ...{
                        images: savedImages.map((m) => {
                            return {
                                id: m.id,
                                image: m.image,
                            };
                        }),
                    }
                })
            }
            else {
                return utils.responseGenerator(StatusCodes.NOT_FOUND, "Image Flip Content Id Not Found")
            }
        }
        catch (err) {
            next(err)
        }
    }
}