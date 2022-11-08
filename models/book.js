const Sequelize = require('sequelize');

module.exports = class Book extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      ISBN: {
        primaryKey: true,
        type: Sequelize.STRING(13),
        allowNull: false
    },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      book_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      book_stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      list_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      publish_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: '2022-11-08'
      },
      book_writer: {
        type: Sequelize.STRING(10),
        allowNull: false
      }
    }, {
      sequelize,
      createdAt:false,
      updatedAt: false,
      underscored: false,
      modelName: 'Book',
      tableName: 'books',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};
