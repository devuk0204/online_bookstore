const Sequelize = require('sequelize');

module.exports = class Order_item extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    order_no: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    ISBN: {
      type: Sequelize.STRING(13),
      primaryKey: true
    },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sell_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    use_point: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    discount_price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
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
  }
};
