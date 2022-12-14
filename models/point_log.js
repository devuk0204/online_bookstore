const Sequelize = require('sequelize');

module.exports = class Point_log extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      log_no: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    total_point: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },    
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    change_point: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Point_log',
      tableName: 'point_logs',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};
