const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      resident_r_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      agentList_ra_regno: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      content: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_time: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updated_time: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored : true,
      modelName: 'review',
      tableName: "review",
      paranoid: false,
      charset: 'utf8mb4', // 이모티콘까지 입력받을수 있도록
      collate: 'utf8mb4_general_ci', // 이모티콘까지 입력받을수 있도록
    });
  }
  static associate(db) { }
}