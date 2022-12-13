const Sequelize = require('sequelize');

module.exports = class Day_tally extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      tally_no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tally_day: {
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
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Day_tally',
      tableName: 'day_tally',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};
