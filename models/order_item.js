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
    db.Order_item.belongsTo(db.Book, {
      foreignKey: {
        allowNull: false,
        name: 'ISBN',
        primaryKey: true,
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }, sourceKey: 'ISBN'});

    db.Order_item.belongsTo(db.Order, {
      foreignKey: {
        allowNull: false,
        name: 'order_no',
        primaryKey: true,
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }, sourceKey: 'order_no'});
  }
};
