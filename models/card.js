const Sequelize = require('sequelize');

module.exports = class Card extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      card_no: {
        primaryKey: true,
        type: Sequelize.STRING(16),
        allowNull: false
      },
      card_expiry_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      card_type: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Card',
      tableName: 'cards',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};
