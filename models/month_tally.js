const Sequelize = require('sequelize');

module.exports = class Month_tally extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      tally_no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      strat_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      ISBN: {
        type: Sequelize.STRING(13),
        allowNull: false,
      },
      sales: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sex: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      age_range: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      best_seller: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Month_tally',
      tableName: 'month_tally',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};
