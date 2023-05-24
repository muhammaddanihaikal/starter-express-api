"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          nama: "dani",
          email: "dani@gmail.com",
          password:
            "$2b$10$emn4kswDEcojmpn63CylQ.MZ85gBtsGJjiCj26IvU2Tf7KsAF/IRW",
        },
        {
          nama: "ekal",
          email: "ekal@gmail.com",
          password:
            "$2b$10$MoQQ8gr2zqAMo19fsLiqWOFNeQ8UscqZciQuLVJbRGHFmB85GE6.y",
        },
        {
          nama: "basir",
          email: "basir@gmail.com",
          password:
            "$2b$10$5tBQJ8ZAJMe8VTaOEJMhD..MTKpxQTFXo9tXcSS6O1FE3RfJtttG6",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
