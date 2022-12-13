const Sequelize = require('sequelize');

module.exports = class Sales_revenue extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      revenue_no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      revenue_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      take: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discounted_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      used_point: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Sales_revenue',
      tableName: 'sales_revenue',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};
