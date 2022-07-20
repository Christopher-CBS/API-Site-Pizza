'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dessert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dessert.init({
    nom: DataTypes.STRING,
    ingredient: DataTypes.STRING,
    prix: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dessert',
  });
  return Dessert;
};