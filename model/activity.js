'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      Activity.hasMany(models.Todo, {
        foreignKey: 'activity_group_id',
        as: 'todo',
      });
    }
  };
  Activity.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: DataTypes.STRING,
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
    }
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};