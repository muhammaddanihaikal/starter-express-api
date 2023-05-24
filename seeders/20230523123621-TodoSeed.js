"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Todos",
      [
        { id: "df3g6", todo: "makan jajan sama minum es" },
        { id: "sdf32", todo: "berlari di tengah hujan" },
        { id: "aa2f3", todo: "baca buku enak kali ya kwkwwk" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Todos", null, {});
  },
};
