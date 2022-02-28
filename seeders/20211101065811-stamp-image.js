"use strict";

require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require(".././config/config")[env];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let gcURL =
      "https://storage.googleapis.com/" + config.gc_bucket + "/images";

    const stampModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "stamp" } },
      ["id"]
    );

    await queryInterface.bulkInsert("images", [
      {
        image: gcURL + "/wanderer.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(), 
        transaction_id: 1,
      },
      {
        image: gcURL + "/inquirer.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 2,
      },
      {
        image: gcURL + "/discoverer.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 3,
      },
      {
        image: gcURL + "/problemsolver.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 4,
      },
      {
        image: gcURL + "/adventureseeker.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 5,
      },
      {
        image: gcURL + "/ambitiousexplorer.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 6,
      },
      {
        image: gcURL + "/tastemaker.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 7,
      },
      {
        image: gcURL + "/geographer.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 8,
      },
      {
        image: gcURL + "/experiencedadventurer.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 9,
      },
      {
        image: gcURL + "/worldtraveler.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 10,
      },
      {
        image: gcURL + "/souschef.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 11,
      },
      {
        image: gcURL + "/culinaryexplorer.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 12,
      },
      {
        image: gcURL + "/citizenscientist.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 13,
      },
      {
        image: gcURL + "/masterchef.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 14,
      },
      {
        image: gcURL + "/agentofchange.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 15,
      },
      {
        image: gcURL + "/worldadventurer.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 16,
      },
      {
        image: gcURL + "/globalgenius.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 17,
      },
      {
        image: gcURL + "/buddinggeographer.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 18,
      },
      {
        image: gcURL + "/mathlete.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 19,
      },
      {
        image: gcURL + "/socialscientist.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 20,
      },
      {
        image: gcURL + "/expertscientist.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 21,
      },
      {
        image: gcURL + "/keyinvestigator.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 22,
      },
      {
        image: gcURL + "/mastergamer.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 23,
      },
      {
        image: gcURL + "/teamplayer.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 24,
      },
      {
        image: gcURL + "/heartofgold.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 25,
      },
      {
        image: gcURL + "/quicklearner.png",
        module_id: stampModuleId,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_id: 26,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const stampModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "stamp" } },
      ["id"]
    );

    await queryInterface.bulkDelete(
      "images",
      {
        module_id: stampModuleId,
      },
      {}
    );
  },
};
