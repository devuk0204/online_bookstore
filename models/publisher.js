const Sequelize = require('sequelize');

module.exports = class Publisher extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      publisher_name: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      publisher_address: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      publisher_contact: {
        type: Sequelize.STRING(11),
        allowNull: true
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Publisher',
      tableName: 'publishers',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Publisher.hasMany(db.Book, {
      foreignKey: {
        name: 'publisher',
        allowNull: false,
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      }, sourckey: 'publisher_name'
    })
  }
};

