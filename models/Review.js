const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'restaurant',
        key: 'id',
      },
    },

  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;
