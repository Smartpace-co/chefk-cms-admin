"use strict";
let utils = require("../src/helpers/utils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("culinary_techniques", [
      {
        title: "Au gratin",
        description:
          "Topping a dish with breadcrumbs or cheese then browning under a broiler",
        video:
          "https://drive.google.com/file/d/1Agep6GgEo72hRuYW-WCD46oTTF6AfzbM/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Au jus",
        description:
          "Meat or sandwiches served with an unthickened sauce made from roast meat drippings",
        video:
          "https://drive.google.com/file/d/1OpFbGpKsHHpz_HdnZPAWTvS5WOsHXZRB/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Bain-marie",
        description:
          "A method of cooking where a container of food is placed in or above boiling water in order to heat gradually or to keep warm.",
        video:
          "https://drive.google.com/file/d/1zlC3FxWQHM1WQafdH7rEnx9ZDGGgwu7Y/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Baking",
        description:
          "Baking is a method of preparing food that uses dry heat, normally in an oven.",
        video:
          "https://drive.google.com/file/d/1o0RogrxMFEZ0dXNwwdTb5olUcZ3GtBPv/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Barbecuing",
        description: "Slow cooking meat or fish with indirect heat and smoke",
        video:
          "https://drive.google.com/file/d/1Mm9Rnu7RE6mQx6q3DZQRPToS7FIyPKMW/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Baste",
        description: "to periodically pour liquid over food as it roasts",
        video:
          "https://drive.google.com/file/d/14wmOMhUM-GWhqs2yx8CKlGm7VaeUnMKx/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Blanching",
        description:
          "a food, usually a vegetable or fruit, is scalded in boiling water, removed after a brief, timed interval, and finally plunged into iced water or placed under cold running water to halt the cooking process",
        video:
          "https://drive.google.com/file/d/13CE3X5FsacPr8S_6jdFtrOti5amXomIk/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Boiling",
        description:
          "Boiling is the method of cooking food in boiling water or other water-based liquids such as milk. The boiling point of water is typically considered to be 100 degrees celsius and 212 Fahrenheit. ",
        video:
          "https://drive.google.com/file/d/1byoFLlelCZgKKdAY534zlZTDH65mqW5F/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Braising",
        description:
          "A combination-cooking method that uses both wet and dry heats: typically the food is first seared at high temperature, then finished in a covered pot at a lower temperature while sitting in some amount of liquid",
       video:
          "https://drive.google.com/file/d/1UzmhbCiL0zNCuU46uWY5UD12CqVYzMOC/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Bricolage",
        description:
          "The preparation of a meal from whatever ingredients happen to be on hand",
        video:
          "https://drive.google.com/file/d/18NM1yHt2LhxFJJKorVuQ3FZFZ8ON1mTA/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Brine",
        description: "To soak food in salted water",
        video:
          "https://drive.google.com/file/d/1oPXUQopxXzWVn5e0sx3XAHK368Wd7oR_/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Broiling",
        description:
          "Cooking foods under a broiler, which sometimes is a separate drawer in your oven, and sometimes requires you placing the top rack in your oven close to the roof of the oven to be near the heat source.",
        video:
          "https://drive.google.com/file/d/15pFRN_dDzJJb7lvuHundCSuDDGSbCw_l/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Caramelization",
        description:
          "Th browning of sugar, a process used extensively in cooking for the resulting nutty flavor and brown color ",
        video:
          "https://drive.google.com/file/d/1Ek68ZZg4IEPLQpCseXWdqS3ypWd_BfDF/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Carry over cooking",
        description:
          "The phenomenon that food retains heat and continues to cook even after being removed from the source of heat.",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Coddling",
        description: "Heating food in water kept just below the boiling point.",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Confit",
        description:
          "A generic term for various kinds of food that have been cooked in grease, oil or suger water",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Cooking with alcohol",
        description:
          "Many dishes incorporate alcoholic beverages into the food itself",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Creaming",
        description:
          "Refers to several different culinary processes in baking, cooking and milk production - To combine ingredients (typically butter and sugar) into a smooth paste - To cook meat or vegetables in a thick dairy-based sauce - to mix puréed corn kernels with whole corn kernels - the butterfat-heavy portion of whole milk that, due to its fat content, separates from the milk and rises to the top.",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Curdling",
        description:
          "The breaking of an emulsion or colloid into large parts of different composition through physico-chemical processes of flocculation, creaming and coalescence. ",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Curing",
        description:
          "Various food preservation and flavoring processes of foods such as meat, fish and vegetables, by the addition of a combination of salt, nitrates, nitrite, or sugar. Many curing processes also involve smoking, the process of flavoring, or cooking",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Deep frying",
        description: "To cook by submerging in hot fat or oil",
        video:
          "https://drive.google.com/file/d/1oJWNkk-pPs0SiBB4zDxj4KAy_uDxL6kp/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Deglazing",
        description:
          "Deglazing is a cooking technique for removing and dissolving browned food residue from a pan to flavor sauces, soups and gravies",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Drying",
        description:
          "To preserve food by removing moisture, either by use of a modern food dehydrator or by the traditional method of allowing sun and win to evaporate moisture. ",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Dutch oven cooking",
        description:
          "A Dutch oven is well suited for long, slow cooking, such as in making roasts, stews, and casseroles. Virtually any recipe that can be cooked in a conventional oven can be cooked in a Dutch oven. They are often used in outdoor cooking, such as when camping.",
        video:
          "https://drive.google.com/file/d/1scWILCXTvVsk37BmBB30VaY_Lg9TO4zd/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Emulsifying",
        description:
          "To combine two liquids that have natural tendency to seperate (such as oil and vinegar) into one homogeneous mass",
        video:
          "https://drive.google.com/file/d/1PSVEgMRLKTRFBxV5fF9E50ftTQ68yBWG/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Fillet",
        description: "To remove bones from meat or fish",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Flambé",
        description: "To pour alcohol over food and then ignite",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Garnish",
        description:
          "To add a decorative element to a plate of food prior to serving",
        video: "https://www.youtube.com/embed/neD5pTigyh4",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Grating",
        description:
          "The process of transforming solid, firm food items into small pieces by rubbing the item against a grating instrument.",
        video:
          "https://drive.google.com/file/d/138EmozbKm1CgWyfLNTHUm1FfqNoetSXJ/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Grilling",
        description:
          "A form of cooking that involves dry heat applied to the surface of food commonly from above, below or from the side. Grilling usually involves a significant amount of direct, radiant heat, and tends to be used for cooking meat and vegetables quickly",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Infusion",
        description:
          "The process of extracting chemical compounds or flavors from plant material in a solvent such as water, oil or alcohol, by allowing the material to remain suspended in the solvent over time. ",
        video: "https://www.youtube.com/embed/UQsTzEDwSbI",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Julienning",
        description: "To cut food into long thin strips",
        video:
          "https://drive.google.com/file/d/1iHRGcslJuLoF4qY7AoIlS9KWT-4SU0KN/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Maceration",
        description: "Softening or breaking into pieces using a liquid",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Marinating",
        description:
          "The process of soaking foods in a seasoned, often acidic, liquid before cooking",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Parboiling",
        description:
          "Parboiling is the partial of semi boiling of food as the first step in cooking",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Paring",
        description:
          "To pare something, is to remove the skin from a fruit or vegetable",
        video:
          "https://drive.google.com/file/d/14nYCuA3nf0WmwwFjlhp_i74SZpMoH3JN/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Peeling Garlic",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Poaching",
        description:
          "Poaching is a cooking technique that involves by submerging food in a liquid, such as water, milk, stock or wine or in a try. ",
        video: "https://www.youtube.com/embed/hIvMewNrGcc",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Proofing",
        description:
          "Proofing is the final rise of shaped bread dough before baking. It refers to a specific rest period within the more generalized process known as fermentation.",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Purée",
        description:
          "A purée is cooked food, usually vegetables, fruits or legumes, that has been ground, pressed, blended or sieved to the consistency of a creamy paste or liquid. ",
        video:
          "https://drive.google.com/file/d/1Lh9fND6z3bL0gzsxC9cL4rXoa1KsZln7/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Rinsing",
        video:
          "https://drive.google.com/file/d/15f85IOc1hbGS8UeJBprCLm0A73N1NC-v/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Reduction",
        description:
          "Reduction is the process of thickening and intensifying the flavor of a liquid mixture such asa soup, sauce, wine, or juice by simmering or boiling.",
        video:
          "https://drive.google.com/file/d/1Lh9fND6z3bL0gzsxC9cL4rXoa1KsZln7/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Roasting",
        description:
          "Roasting is a cooking method that uses dry heat where hot air envelops the food, cooking it evenly on all sides with temperatures of at least 150 degrees celsius or 300 Fahrenheit. ",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Roux",
        description:
          "Equal quantities of flour and fat cooked together to a sandy texture used to make a thickening agent",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Sautéing",
        description:
          "Sautéing is a method of cooking that uses a relatively small amount of oil or fat in a shallow pan over relatively high heat. Various sauté methods exist, and sauté pans are a specific type of pan designed for sautéing.",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Seasoning",
        description:
          "The addition of salt, pepper, herbs and/or spices to enhance the flavor of food.\r\n",
        video:
          "https://drive.google.com/file/d/19_Nj4ieohcv0AOP3u7CLCmExlOTo5qxV/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Separating egg yolks and whites",
        description:
          "To separate the egg yolk from the egg white, you crack the egg open, and then you bounce the egg yolk between the two halved shells, back and forth until all the whites have drained from the shells into a bowl below. This is commonly done for certain desserts where you only need egg whites.  ",
        video:
          "https://drive.google.com/file/d/1NgKssYSSkQ_jRfDI0j3srg9ypL8G_ioK/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Simmering",
        description:
          "Simmering is a food preparation technique in which foods are cooked in hot liquids kept just below boiling point of water, but higher than poaching temperature. ",
        video:
          "https://drive.google.com/file/d/19_Nj4ieohcv0AOP3u7CLCmExlOTo5qxV/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Smoking",
        description:
          "Smoking is the process of flavoring, browning, cooking, or preserving food by exposing it to smoke from burning or smoldering material, most often wood.",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Steaming",
        description:
          "Steaming is a method of cooking using steam. This is often done with a food steamer, a kitchen appliance made specifically to cook food with steam, but food can also be steamed in a wok",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Stewing",
        description:
          "A stew is a combinatioon of solid food ingredients that have been cooked in liquid and served in the resultant gravy. Ingredients in a stew can include any combination of vegetables and may include meat, especially tougher meats, suitable for slow-cooking, such as beef.",
        video:
          "https://drive.google.com/file/d/1fIIW3mcYL3SCcL9Etujo7iOaysiY9DXV/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Stir-frying",
        description:
          "Stir-frying is a Chinese cooking technique in which ingredients are fried in a small amount of very hot oil while being stirred in a wok. ",
        video:
          "https://drive.google.com/file/d/1Hx7ieYiq0kF6x8WoP50YkWPLckrqsMO5/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Stuffing",
        description:
          "Stuffing, filling, or dressing is an edible mixture, normally consisting of small cut-up pieces of bread or a similar starch and served as a side dish or used to fill a cavity in another food item while cooking.",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Sweating",
        description:
          "The gentle heating of vegetables in a little oil or butter, which usually results in tender, somtimes translucent, pieces",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Tempering",
        description:
          "- Tempering chocolate, a method of increasing the shine and durability of chocolate couverture                                                                                                                                        - Tempering cooking, bringing meat to room temperature before cooking",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Toasting",
        description:
          "Toasting is browning food by exposure to a dry heat. This may be by using a toaster, grilling, broiling or cooking over an open fire or a barbecue. Toasting is also a common method of making stale bread palatable. ",
        video:
          "https://drive.google.com/file/d/1TnDNZhS8TAyIbxxXuYIcIJU0AoXEIQkv/preview",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Thickening",
        description:
          "A thickener is a substance which can increase the viscosity of a liquid with substantially changing its other priorities. ",
        system_language_id: 1,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("culinary_techniques", null, {});
  },
};
