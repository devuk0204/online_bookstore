const Sequelize = require('sequelize');

module.exports = class Shipping_address extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      shipping_address_no: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      postal_code: {
        type: Sequelize.STRING(5),
        allowNull: false,
        unique: 'address_unique'
      },
      address1: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: 'address_unique'
      },
      address2: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: 'address_unique'
        },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Shipping_address',
      tableName: 'shipping_addresses',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Shipping_address.belongsTo(db.User, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
        onDelete: 'CASCADE',
        unique: 'address_unique'
      }, sourceKey: 'id'
    });
  }
};
