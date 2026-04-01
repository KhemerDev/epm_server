import { DataTypes, Model } from "sequelize";
import sequelize from "../mildware/db-conn.js";
import argon2 from "argon2";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('ativo', 'inativo', 'suspenso'),
      allowNull: false,
      defaultValue: 'ativo',
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await argon2.hash(user.password);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await argon2.hash(user.password);
        }
      }
    },
  }
);
User.associate = (models) => {
  User.hasOne(models.Profile, { foreignKey: 'userId', as: 'profile' });
console.log(models);

  // User.hasMany(models.Visitor, { foreignKey: 'referredBy', as: 'visitors' });
  // User.hasMany(models.Convert, { foreignKey: 'referredBy', as: 'converts' });
};

export default User;
