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
        type: Sequelize.STRING(100),
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
        get() {
          // created_time 값을 원하는 형식으로 포맷팅하여 반환
          const createdTime = this.getDataValue('created_time');
          return createdTime ? createdTime.toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'}) : null;
        }
      },
      updated_time: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
        get() {
          // updated_time 값을 원하는 형식으로 포맷팅하여 반환
          const updatedTime = this.getDataValue('updated_time');
          return updatedTime ? new Date(updatedTime).toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'}) : null;

        }
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