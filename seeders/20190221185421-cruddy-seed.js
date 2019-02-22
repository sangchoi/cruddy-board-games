'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('games', [{
     name: "TicTacToe",
     description: "Awesome strategy game",
     players: 2,
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: "UNO",
     description: "Awesome card game",
     players: 8,
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
    name: "Phase 10",
    description: "Another incredible card game",
    players: 6,
    createdAt: new Date(),
    updatedAt: new Date()
   }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('games', null, {});
  }
};
