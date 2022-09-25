'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {};
  Todo.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    activity_group_id: DataTypes.BIGINT,
    is_active: DataTypes.TINYINT,
    priority: DataTypes.STRING,
    title: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
    },
    deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
    },
  }, {
    sequelize,
    modelName: 'Todo',
    underscored: true
  });
  return Todo;
};