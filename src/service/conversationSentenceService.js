"use strict"

let ConversationSentence = require("../models").conversation_sentences
let Category = require("../models").categories
let utils = require("../helpers/utils")
let { StatusCodes } = require("http-status-codes")

module.exports = {

    createConversationSentence: async (reqBody, reqUser) => {
        try {
            reqBody.createdBy = reqUser.id;
            let savedConversationSentence = await ConversationSentence.create(reqBody)


            return utils.responseGenerator(StatusCodes.OK, "Conversation Sentence Saved Successfully", savedConversationSentence)
        }
        catch (err) {
            if (err instanceof UniqueConstraintError) {
                return utils.responseGenerator(
                    StatusCodes.CONFLICT,
                    "Conversation Sentence Already Exist"
                );
            } else if (err instanceof ForeignKeyConstraintError) {
                return utils.responseGenerator(
                    StatusCodes.NOT_FOUND,
                    "Conversation Sentence Not Exist"
                );
            }
            console.log("Error ==> ", err);
            throw err;
        }


    },

    getAllConversationSentence: async (params) => {
        try {
          let allConversationSentences = [];
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
            allConversationSentences = await ConversationSentence.findAll(query);
          } else {
            allConversationSentences = await ConversationSentence.findAll({
              attributes: ["id", "conversationSentence", "status"],
              include: [
                {
                  model: Category,
                  attributes: ["id", "categoryTitle"],
                },
              ],
              ...pagging,
            });
          }
          if (allConversationSentences.length === 0) {
            return utils.responseGenerator(
              StatusCodes.NOT_FOUND,
              "Conversation Sentence Not Exist", []
            );
          } else {
            return utils.responseGenerator(
              StatusCodes.OK,
              "All Conversation Sentences Fetched Successfully",
              allConversationSentences
            );
          }
        } catch (err) {
          console.log("Error ==> ", err);
          throw err;
        }
      },

    getConversationSentence: async (id) => {
        try {
            let conversationSentenceDetails = await ConversationSentence.findOne({
                where: { id: id },
                include: [
                    {
                        model: Category,
                        attributes: ["id", "categoryTitle"],
                    },
                ],
            })

            if (!conversationSentenceDetails) {
                return utils.responseGenerator(
                    StatusCodes.NOT_FOUND,
                    "Conversation Sentence Not Exist"
                );
            } else {
                return utils.responseGenerator(
                    StatusCodes.OK,
                    "Conversation Sentence Fetched Successfully",
                    conversationSentenceDetails
                );
            }
        }
        catch (err) {
            console.log("Error ==> ", err);
            throw err;
        }
    },

    deleteConversationSentence: async (id) => {
        try {
            let deletedConversationSentence = await ConversationSentence.destroy({
                where: {
                    id: id
                }
            })
            return utils.responseGenerator(StatusCodes.OK, "Conversation Sentence Deleted Successfully", deletedConversationSentence)
        }
        catch (err) {
            console.log("Error ==> ", err);
            throw err;
        }
    },


    updateConversationSentence: async (reqBody, reqUser, id) => {
        try {
            reqBody.updatedBy = reqUser.id;
            let updateConversationSentence = await ConversationSentence.findOne({
                where: {
                    id: id
                }
            })
            if (!updateConversationSentence) {
                return utils.responseGenerator(StatusCodes.NOT_FOUND, "Conversation Sentence Does Not Exist", updateConversationSentence)
            }
            await ConversationSentence.update(reqBody, { where: { id: id } });

            return utils.responseGenerator(StatusCodes.OK, "Conversation Sentence Updated Successfully")
        }
        catch (err) {
            if (err instanceof UniqueConstraintError) {
                return utils.responseGenerator(
                    StatusCodes.CONFLICT,
                    "Conversation Sentence  already exist"
                );
            } else if (err instanceof ForeignKeyConstraintError) {
                return utils.responseGenerator(
                    StatusCodes.NOT_FOUND,
                    "Conversation Sentence Not Exist"
                );
            }
            console.log("Error ==> ", err);
            throw err;
        }
    }



}