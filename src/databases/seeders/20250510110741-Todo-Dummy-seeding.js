'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM dm_user',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const statuses = ['todo', 'in_progress', 'done'];
    const now = new Date();
    const todos = [];

    users.forEach((user) => {
      Array.from({ length: 10 }).forEach((_, i) => {
        todos.push({
          title: `Task ${i + 1} for ${user.name}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          isActive: true,
          userId: user.id,
          createdAt: now,
          updatedAt: now
        });
      });
    });

    await queryInterface.bulkInsert('dm_todo', todos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dm_todo', null, {});
  }
};
