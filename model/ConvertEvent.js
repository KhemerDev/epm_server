import { DataTypes, Model } from 'sequelize';
import sequelize from '../mildware/db-conn.js';

class ConvertEvent extends Model {}

ConvertEvent.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    convertId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'converts', key: 'id' },
      onDelete: 'CASCADE',
    },
    eventType: {
      type: DataTypes.ENUM('first_visit', 'second_visit', 'baptism', 'meeting', 'call'),
      allowNull: false,
      defaultValue: 'first_visit',
    },
    eventDate: { type: DataTypes.DATEONLY, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: true },
    responsibleUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    modelName: 'ConvertEvent',
    tableName: 'convert_events',
    timestamps: true,
    indexes: [
      { fields: ['convertId'] },
      { fields: ['eventDate'] },
      { fields: ['eventType'] },
    ],
  }
);

export default ConvertEvent;
