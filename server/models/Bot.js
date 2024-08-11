import { DataTypes } from "sequelize";

export function initializeBot(sequelize) {
  const Bot = sequelize.define(
    "Bot",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      focus_topic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "bots",
      timestamps: false,
    }
  );

  return Bot;
}
