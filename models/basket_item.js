const Sequelize = require('sequelize');

module.exports = class Basket_item extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    event_yn: {
      type: Sequelize.INTEGER,
      allowNull: true,
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
    db.Basket_item.belongsTo(db.Book, {
        foreignKey: {
            allowNull: false,
            name: 'ISBN',
            primaryKey: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            unique: 'basket_item_unique'
        }, sourceKey: 'ISBN'});

    db.Basket_item.belongsTo(db.Shopping_basket, {
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
