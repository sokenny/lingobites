import { DataTypes } from "sequelize";

export function initializeUserOnboarding(sequelize) {
  const UserOnboarding = sequelize.define(
    "UserOnboarding",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plan_selected: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      native_language: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      learning_language: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      current_level: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      target_level: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      interests: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "users", // references the 'users' table
          key: "id", // the 'id' column in the 'users' table
        },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "user_onboardings",
      timestamps: false, // Manually specifying created_at
    }
  );

  return UserOnboarding;
}
