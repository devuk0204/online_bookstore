const Sequelize = require('sequelize');

module.exports = class Admin_post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        post_no: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        post_type: {
            type: Sequelize.STRING(6),
            allowNull: false,
        },
        main_category: {
            type: Sequelize.STRING(15),
            allowNull: true,
        },
        sub_category: {
            type: Sequelize.STRING(15),
            allowNull: true
        },
        title: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Admin_post',
      tableName: 'admin_posts',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};
