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

getAllDiscussionforum: async (params) => {
    try {
      let discussionForums = [];
      //pagging
      const { page_size, page_no = 1 } = params;
      const pagging = {};
      parseInt(page_size)
        ? (pagging.offset = parseInt(page_size) * (page_no - 1))
        : null;
      parseInt(page_size) ? (pagging.limit = parseInt(page_size)) : null;
      if (
        Object.keys(params).length !== 0 &&
        (params.filters || params.fields || params.sorting)
      ) {
        const query = await modelHelper.queryBuilder(params, pagging);
        discussionForums = await DiscussionForum.findAll(query);
      } else {
        discussionForums = await DiscussionForum.findAll({
          where: {
            deletedBy: null,
          },
          ...pagging,
        });
      }
      return utils.responseGenerator(
        StatusCodes.OK,
        "All Discussion Forum Fetched Successfully",
        discussionForums
      );
    } catch (err) {}
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