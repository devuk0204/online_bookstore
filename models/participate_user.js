const Sequelize = require('sequelize');

module.exports = class Participate_user extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        id: {
            type: Sequelize.STRING(15),
            primaryKey: true,
        },
        reception_no: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        participate_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        benefit_status: {
            type: Sequelize.STRING(3),
            allowNull: true,
        },
        personal_information: {
            type: Sequelize.STRING(3),
            allowNull: true,
        },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Participate_user',
      tableName: 'Participate_users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Participate_user.belongsTo(db.User, {
        foreignKey: {
            name: 'id',
            allowNull: false,
            primaryKey: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }, sourceKey: 'id'
    });
  }
};
