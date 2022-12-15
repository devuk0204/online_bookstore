const Sequelize = require('sequelize');

module.exports = class Event_commercial extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        reception_no: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        reception_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        reception_status: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        commercial_event_status: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        post_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        banner_img: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description_img: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        popup_img: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        start_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        end_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        drawing_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        ISBN: {
            type: Sequelize.STRING(13),
            allowNull: true,
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        benefit_condition_book: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        benefit_apply_yn: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        answer_yn: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        benefit_type: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        benefit :{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        total_quantity: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        exhausted_quantity: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        event_question: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        event_question_answer: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        views: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Event_commercial',
      tableName: 'Event_commercials',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Event_commercial.belongsTo(db.User, {
        foreignKey: {
            name: 'admin_id',
            allowNull: true,
            onDelete: 'SETNULL',
            onUpdate: 'SETNULL',
        }, sourceKey: 'id'
    })
  }
};
