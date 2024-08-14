import { DataTypes } from "sequelize";

export function initializeBite(sequelize) {
  const Bite = sequelize.define(
    "Bite",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      original: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      translation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      batch_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      translated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      score: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 10,
        },
      },
      delivered_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "bites",
      timestamps: false,
    }
  );

  return Bite;
}
