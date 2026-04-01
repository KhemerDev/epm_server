import { DataTypes, Model } from 'sequelize';
import sequelize from '../mildware/db-conn.js';

class Member extends Model {}

Member.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    birthDate: { type: DataTypes.DATEONLY, allowNull: true },
    address: { type: DataTypes.STRING(500), allowNull: true },
    status: {
      type: DataTypes.ENUM('ativo', 'inativo', 'visitante'),
      allowNull: false,
      defaultValue: 'ativo',
    },
    joinDate: { type: DataTypes.DATEONLY, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Member',
    tableName: 'members',
    timestamps: true,
    indexes: [
      { fields: ['status'] },
      { fields: ['joinDate'] },
      { fields: ['email'] },
    ],
  }
);

export default Member;
