"use strict"

const DiscussionForum=require("../models").discussion_forums
const{StatusCodes}=require("http-status-codes")
const utils=require("../helpers/utils")

module.exports={

    createDiscussionforum:async (reqBody,reqUser)=>
    {
        try{
                reqBody.createdBy=reqUser.id;
                let discussionForumDetails=await DiscussionForum.create(reqBody)
                return utils.responseGenerator(StatusCodes.OK,"Discussion Forum Saved Successfully",discussionForumDetails)
    }
        catch(err)
    {
        console.log(err)
        next(err)
    }
},

getAllDiscussionforum:async()=>{
    try{
            let details=await DiscussionForum.findAll({
                where:{
                    deletedBy:null
                }
            })
            return utils.responseGenerator(StatusCodes.OK,"All Discussion Forum Fetched Successfully",details)

    }
    catch(err)
    {

    }
},

getDiscussionforumById:async(id)=>{
    try{
            let details=await DiscussionForum.findOne({
                where:{
                    id:id
                }
            })
            return utils.responseGenerator(StatusCodes.OK,"Discussion Forum Fetched Successfully",details)

    }
    catch(err)
    {

    }
},
deleteDiscussionforum:async (id,reqBody,reqUser)=>{
    try{
        reqBody.deletedBy=reqUser.id;
        reqBody.deletedAt=new Date();
            let deleteById=await DiscussionForum.update(reqBody,{
                where:{
                    id:id
                }
            })
            return utils.responseGenerator(StatusCodes.OK,"Discussion Forum Deleted Successfully",deleteById)


    }
    catch(err)
    {
        next(err)
    }
},
updateDiscussionforum:async(id,reqBody,reqUser)=>{
    try{
            reqBody.updatedBy=reqUser.id
            let updateDetails=await DiscussionForum.update(reqBody,{
                where:{
                    id:id
                }
            })
            return utils.responseGenerator(StatusCodes.OK,"Discussion Forum Updated Successfully",updateDetails)


    }
    catch(err)
    {

    }
}
}