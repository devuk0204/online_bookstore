const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    order_no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    card_no: {
        type: Sequelize.STRING(16),
        allowNull: false
    },
    card_expiry_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    card_type: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    postal_code: {
        type: Sequelize.STRING(5),
        allowNull: false,
    },
    address1: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    address2: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    total_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    refund_request_date: {
        type: Sequelize.DATEONLY,
        allowNull: true  
    },
    refund_reason: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    refund_expect_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    refund_price: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    order_status: {
        type: Sequelize.STRING(4),
        defaultValue: '준비중'
    },
    use_point: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
    }, {
      sequelize,
      updatedAt: false,
      underscored: false,
      modelName: 'Order',
      tableName: 'orders',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};
