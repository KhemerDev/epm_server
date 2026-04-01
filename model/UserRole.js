import { DataTypes, Model } from 'sequelize';
import sequelize from '../mildware/db-conn.js';

class UserRole extends Model {}

UserRole.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    role: {
      type: DataTypes.ENUM('admin', 'pastor', 'secretaria', 'midia', 'membro'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { unique: true, fields: ['userId', 'role'] },
    ],
  }
);

export default UserRole;
