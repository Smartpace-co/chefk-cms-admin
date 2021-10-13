let NotificationType = require("../models").notification_types;
let Notification = require("../models").notifications;
let utils = require("../helpers/utils");
let { StatusCodes } = require("http-status-codes");
let notificationConstant = require("../constants/notification").notification;


module.exports = {
  createNotifications: async (
    entityIds,
    roleId,
    reqUserId,
    notificationKey,
    templateVars
  ) => {

    console.log('inside notification function ==', templateVars);
    try {
      let notificationType = await NotificationType.findOne({
        where: { key: notificationKey },
      });
      let description = new Function(
        "return `" + notificationConstant[notificationKey] + "`;"
      ).call(templateVars);
      if (Array.isArray(entityIds)) {

        let notificationsEntity = entityIds.map((id) => {
          return {
            entityId: id,
            roleId,
            notificationTypeId: notificationType.id,
            description,
            createdBy: reqUserId,
          };
        });
        await Notification.bulkCreate(notificationsEntity);
      } else {
        await Notification.create({
          entityId: entityIds,
          roleId,
          notificationTypeId: notificationType.id,
          description,
          createdBy: reqUserId,
        });
      }
      return utils.responseGenerator(
        StatusCodes.OK,
        "Notification saved successfully"
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

};


