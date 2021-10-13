"use strict"

let HealthHygiene = require("../models").health_hygienes
let utils = require("../helpers/utils")
let { StatusCodes } = require("http-status-codes")

module.exports = {

    createHealthHygiene: async (reqBody, reqUser) => {
        try {

            reqBody.createdBy = reqUser.id;
            let saveHealthHygiene = await HealthHygiene.create(reqBody)
            return utils.responseGenerator(StatusCodes.OK, "Health Hygiene Saved Successfully", saveHealthHygiene)


        }
        catch (err) {
            next(err)
        }
    },

    getAllHealthHygiene: async () => {
        try {

            let getHealthHygiene = await HealthHygiene.findAll({})
            return utils.responseGenerator(StatusCodes.OK, "All Health And Hygiene Fetched Successfully", getHealthHygiene)
        }
        catch (err) {
            next(err)
        }
    },

    getHealthHygiene: async (id) => {
        try {
            if (id) {
                let getHealthHygiene = await HealthHygiene.findOne({
                    where: {
                        id: id
                    }
                })
                if (!getHealthHygiene) {
                    return utils.responseGenerator(StatusCodes.NOT_FOUND, "Health Hygiene Activity Does Not Exist")
                }
                else {
                    return utils.responseGenerator(StatusCodes.OK, "Health Hygiene Fetched Successfully", getHealthHygiene)
                }
            }
            else {
                return utils.responseGenerator(StatusCodes.NOT_FOUND, "Id Not Found")

            }

        }
        catch (err) {
            next(err)
        }
    },


    deleteHealthHygiene: async (id) => {

        try {
            if (id == 'null') {
                return utils.responseGenerator(StatusCodes.NOT_FOUND, "Health Hygiene ID Not Found ")
            }
            else {
                await HealthHygiene.destroy({
                    where: {
                        id: id
                    }
                })
                return utils.responseGenerator(StatusCodes.OK, "Health Hygiene Deleted Successfully ")

            }

        }
        catch (err) {
            next(err)
        }
    },

    updateHealthHygiene:async(id,reqBody,reqUser)=>{
        try{
                if(id=='null')
                {
                    return utils.responseGenerator(StatusCodes.NOT_FOUND,"Health Hygiene ID Not Found")
                }
                else{
                    reqBody.updatedBy=reqUser.id
                    let healthHygieneDetails=await HealthHygiene.findOne({
                        where:{
                            id:id
                        }
                    })
                    if(!healthHygieneDetails)
                    {
                        return utils.responseGenerator(StatusCodes.NOT_FOUND,"Health Hygiene Details Not Found")
                    }
                    else{
                        let updateHealthHygieneDetails=await HealthHygiene.update(reqBody,{
                            where:{
                                        id:id
                            }
                        })
                        return utils.responseGenerator(StatusCodes.OK,"Health Hygiene Updated Successfully",updateHealthHygieneDetails)
                    }

                }
        }
        catch(err)
        {
            next(err)
        }
    }



}