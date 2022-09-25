'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let json = [
      {
        "id": 1,
        "activity_group_id": "2",
        "title": "item1",
        "is_active": "1",
        "priority": "very-high",
        "created_at": "2021-11-30T18:09:19.000Z",
        "updated_at": "2021-11-30T20:23:12.000Z",
        "deleted_at": null
      },
      {
        "id": 3,
        "activity_group_id": "1179",
        "title": "item1",
        "is_active": "1",
        "priority": "very-high",
        "created_at": "2021-11-30T20:34:56.000Z",
        "updated_at": "2021-11-30T20:34:57.000Z",
        "deleted_at": null
      }
    ]
    return queryInterface.bulkInsert('todos', json);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('todos', null, {});
  }
};
