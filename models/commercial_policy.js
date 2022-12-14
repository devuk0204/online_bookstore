const Sequelize = require('sequelize');

module.exports = class Commercial_policy extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        policy_no: {
            type: Sequelize.STRING(6),
            primaryKey: true,
        },
        policy_effective_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        post_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price_per_day: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Commercial_policy',
      tableName: 'Commercial_policies',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Commercial_policy.hasMany(db.Event_commercial, {
        foreignKey: {
            name: 'policy_no',
            allowNull: true,
            onDelete: 'SETNULL',
            onUpdate: 'SETNULL',
        }, SourceKey: 'policy_no'
    })
  }
};
