"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const standards = await queryInterface.sequelize.query("SELECT id,key_value,title FROM standards");
    const skills = await queryInterface.sequelize.query("SELECT id,title FROM skills");
    await queryInterface.bulkInsert("standard_skills", [
      //CC Math
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.k.cc.a.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "counting").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.k.cc.a.2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "counting").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.k.cc.a.3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "writing numbers").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.1.oa.a.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "adding and subtracting").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.1.oa.a.2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "adding and subtracting").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.1.oa.b.3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "adding and subtracting").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.2.oa.a.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "addition and subtraction").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.2.oa.b.2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "operations").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.2.oa.c.3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "understanding odd and even").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.3.oa.a.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "multiplication and division").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.3.oa.a.2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "multiplication and division").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.3.oa.a.3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "multiplication and division").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.4.oa.a.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "multiplication and division").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.4.oa.a.2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "multiplication and division").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.4.oa.a.3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "multiplication and division").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.5.oa.a.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "expressions").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.5.oa.a.2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "expressions").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.math.content.5.nbt.a.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "place value").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      //NGSS
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "k-ps2-1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "investigating").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "k-ps2-2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "analyzing data").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "k-ls1-1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "describing patterns").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "1-ps4-1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "plan and conduct investigations").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "1-ps4-2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "evidence-based reasoning").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "1-ps4-3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "evidence-based reasoning").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "2-ps1-1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "investigating").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "2-ps1-2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "analysis").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "2-ps1-3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "observing").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "3-ps2-1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "investigating").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "3-ps2-2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "observing").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "3-ps2-3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "cause and effect relationships").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "4-ps3-1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "using evidence").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "4-ps3-2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "using evidence").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "4-ps3-3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "energy").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "5-ps1-1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "modelling").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "5-ps1-2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "measuring").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "5-ps1-3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "measuring").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      //ELA
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.rl.k.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "reading literature").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.ri.k.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "reading informational text").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.rf.k.1.b").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "foundational reading skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.w.k.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "writing skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.sl.k.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "speaking and listening skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss-ela-rl.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "reading literature").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss-ela-ri.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "reading informational text").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss-ela-rf.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "foundational language skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.w.1.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "writing skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss-ela-sl.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "speaking and listening skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.rf.2.3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "foundational language skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.w.2.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "writing skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.sl.2.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "speaking and listening skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.l.2.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "language skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.rf.3.3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "foundational language skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.w.3.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "writing skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.sl.3.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "speaking and listening skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.l.3.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "language skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.rf.4.3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "foundational language skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.w.4.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "writing skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.l.4.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "language skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.rl.5.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "reading literature").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.ri.5.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "reading informational text").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.rf.5.3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "foundational language skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.w.5.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "writing skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.sl.5.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "speaking and listening skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "ccss.ela-literacy.l.5.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "language skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      //NCSS
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "k.1").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "citizenship skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "k.2").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "recognition of national symbols and icons").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find((e) => e.key_value.toLowerCase() === "k.3").id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "knowledge of jobs").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() === "1.1 students describe the rights and individual responsibilities of citizenship."
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "citizenship skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() === "1.2 students compare and contrast the absolute and relative locations of places"
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "locating skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() ===
            "1.3 students know and understand the symbols, icons, and traditions of the united states"
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "citizenship skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() ===
            "2.1 students differentiate between things that happened long ago and things that happened yesterday."
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "knowledge of history").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() ===
            "2.2 students demonstrate map skills by describing the absolute and relative locations of people, places, and environments."
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "map skills").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() ===
            "2.3 students explain governmental institutions and practices in the united states and other countries."
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "knowledge of government").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() ===
            "3.1 students describe the physical and human geography and use maps, tables, graphs, photographs"
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "physical and human geography").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() ===
            "3.2 students describe the american indian nations in their local region long ago and in the recent past."
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "knowledge of american indian nations").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() ===
            "3.3 students draw from historical and community resources to organize the sequence of local historical events"
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "knowledge of history").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) => e.key_value.toLowerCase() === "4.1 students demonstrate an understanding of the physical"
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "physical and human geography").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) => e.key_value.toLowerCase() === "4.2 students describe the social, political, cultural, and economic life"
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "knowledge of life prior to colonization").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) => e.key_value.toLowerCase() === "4.3 students explain the economic, social, and political life in california"
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "knowledge of life during colonization").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() ===
            "5.1 students describe the major pre-columbian settlements, including the cliff dwellers"
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "knowledge of precolumbian settlements").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() ===
            "5.2 students trace the routes of early explorers and describe the early explorations of the americas."
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "knowledge of early exploreres").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        standard_id: standards[0].find(
          (e) =>
            e.key_value.toLowerCase() ===
            "5.3 students describe the cooperation and conflict that existed among the american indians"
        ).id,
        skill_id: skills[0].find((e) => e.title.toLowerCase() === "knowledge of early american history").id,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("standard_skills", null, {});
  },
};
