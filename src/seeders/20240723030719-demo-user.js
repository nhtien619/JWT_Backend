'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * ? Add seed commands here.
     *
    */

    await queryInterface.bulkInsert('User', [{
      email: 'nguyenhoangtien619@gmai.com',
      password: '12345678',
      username: 'nhtien',
      groupId: 1,
      sex: 'Men',
      phone: '0903740561',
      address: 'NTS Street, ward 4, district GV',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
/**
 * TODO: generate class seeder to add demo database
 * ?command: npx sequelize-cli seed:generate --name demo-user 
 * 
 * TODO: Add sedds to database
 * ?command: npx sequelize-cli db:seed:all
*/

