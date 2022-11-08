const Sequelize = require('sequelize');
const { Order } = require('.');

module.exports = class Order_item extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sell_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Order_item',
      tableName: 'order_items',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Order.belongsToMany(db.Book, {
      through: Order_item,
      foreignKey: {
        allowNull: false,
        name: 'order_no',
        primaryKey: false,
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }, sourceKey: 'order_no'});

    db.Book.belongsToMany(db.Order, {
      through: Order_item,
      foreignKey: {
        allowNull: false,
        name: 'ISBN',
        primaryKey: false,
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }, sourceKey: 'ISBN'});
  }
};
