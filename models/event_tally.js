const Sequelize = require('sequelize');

module.exports = class Event_tally extends Sequelize.Model {
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
      reception_no: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      views: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      participants: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      beneficiary: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Event_tally',
      tableName: 'event_tally',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};
