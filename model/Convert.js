import { DataTypes, Model } from 'sequelize';
import sequelize from '../mildware/db-conn.js';

class Convert extends Model {}

Convert.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    conversionDate: { type: DataTypes.DATEONLY, allowNull: false },
    referredBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'SET NULL',
    },
    notes: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.ENUM('novo', 'acompanhado', 'membro'),
      allowNull: false,
      defaultValue: 'novo',
    },
  },
  {
    sequelize,
    modelName: 'Convert',
    tableName: 'converts',
    timestamps: true,
    indexes: [
      { fields: ['conversionDate'] },
      { fields: ['status'] },
    ],
  }
);

export default Convert;
