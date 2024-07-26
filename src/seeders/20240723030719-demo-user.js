'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * ? Add seed commands here.
     *
    */

    await queryInterface.bulkInsert('User', [{
      email: 'JohnDoe112@gmai.com',
      password: '334422',
      username: 'joedoe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'JohnDoe113@gmai.com',
      password: '334422',
      username: 'joedoe2',
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

