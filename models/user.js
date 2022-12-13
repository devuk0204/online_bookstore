const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.STRING(15),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      sex: {
        type: Sequelize.STRING(6),
        allowNull: true,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING(11),
        allowNull: true
      },
      point_stamp: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      point: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      id_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      createdAt: true,
      updatedAt: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Card, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }, sourceKey: 'id'
    });

    db.User.hasMany(db.Shipping_address, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }, sourceKey: 'id'
    });

    db.User.hasMany(db.Order, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
        onDelete: 'SET NULL',
        onUpdate: 'RESTRICT',
      }, sourceKey: 'id'
    });

    db.User.hasMany(db.Shopping_basket, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }, sourceKey: 'id'
    });

    db.User.hasMany(db.Point_log, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }, sourcekey: 'id'
    });

    db.User.hasMany(db.Admin_post, {
      foreignKey: {
        name: 'admin_id',
        allowNull: false,
        onDelete: 'SETNULL',
        onUpdate: 'SETNULL'
      }, sourceKey: 'id'
    })
  }
};
