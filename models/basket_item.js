const Sequelize = require('sequelize');

module.exports = class Basket_item extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      id: false,
      modelName: 'Basket_item',
      tableName: 'basket_items',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Book.belongsToMany(db.Shopping_basket, {
      through: Basket_item,
        foreignKey: {
            allowNull: false,
            name: 'ISBN',
            primaryKey: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            unique: 'basket_item_unique'
        }, sourceKey: 'ISBN'});

    db.Shopping_basket.belongsToMany(db.Book, {
      through: Basket_item,
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
