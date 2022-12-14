const Sequelize = require('sequelize');

module.exports = class Shopping_basket extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    }, {
      sequelize,
      updatedAt: false,
      underscored: false,
      modelName: 'Shopping_basket',
      tableName: 'shopping_baskets',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Shopping_basket.hasMany(db.Basket_item, {
      foreignKey: {
          allowNull: false,
          name: 'basket_no',
          primaryKey: false,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          unique: 'basket_item_unique'
      }, sourceKey: 'id'});
  } 
};
