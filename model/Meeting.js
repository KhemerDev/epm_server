import { DataTypes, Model } from 'sequelize';
import sequelize from '../mildware/db-conn.js';

class Meeting extends Model {}

Meeting.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    date: { type: DataTypes.DATE, allowNull: false },
    location: { type: DataTypes.STRING(500), allowNull: true },
    type: {
      type: DataTypes.ENUM('culto', 'reuniao', 'visitacao', 'obreiros'),
      allowNull: false,
      defaultValue: 'culto',
    },
    organizedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'SET NULL',
    },
    participants: { type: DataTypes.INTEGER, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    cancelled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    modelName: 'Meeting',
    tableName: 'meetings',
    timestamps: true,
    indexes: [
      { fields: ['date'] },
      { fields: ['type'] },
      { fields: ['organizedBy'] },
    ],
  }
);

export default Meeting;
