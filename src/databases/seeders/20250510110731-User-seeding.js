'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const hashedPassword = await bcrypt.hash('password', 10);

    await queryInterface.bulkInsert('dm_user', [
      {
        
        name: 'User 1',
        email: 'user1@aulia.sch.id',
        password: hashedPassword,
        isActive: true,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'User 2',
        email: 'user2@aulia.sch.id',
        password: hashedPassword,
        isActive: true,
        createdAt: now,
        updatedAt: now
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dm_user', {
      email: ['user1@aulia.sch.id', 'user2@aulia.sch.id']
    }, {});
  }
};
