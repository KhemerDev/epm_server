import { DataTypes, Model } from 'sequelize';
import sequelize from '../mildware/db-conn.js';

class Visitor extends Model {}

Visitor.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    visitDate: { type: DataTypes.DATEONLY, allowNull: false },
    visitCount: { type: DataTypes.INTEGER, defaultValue: 1 },
    notes: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.ENUM('visitante', 'convertido', 'membro'),
      allowNull: false,
      defaultValue: 'visitante',
    },
  },
  {
    sequelize,
    modelName: 'Visitor',
    tableName: 'visitors',
    timestamps: true,
    indexes: [
      { fields: ['visitDate'] },
      { fields: ['status'] },
    ],
  }
);

export default Visitor;
