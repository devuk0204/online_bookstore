const Sequelize = require('sequelize');

module.exports = class Order_status extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      status_name: {
        primaryKey: true,
        type: Sequelize.STRING(4),
        allowNull: false
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Order_status',
      tableName: 'order_status',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Order_status.hasMany(db.Order, {
        foreignKey: {
          name: 'order_status',
          allowNull: false,
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT',
        }, sourckey: 'status_name'
      })
    }
};

