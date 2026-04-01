import { DataTypes, Model } from 'sequelize';
import sequelize from '../mildware/db-conn.js';

class Media extends Model {}

Media.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('video', 'audio', 'foto'), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    fileUrl: { type: DataTypes.STRING(500), allowNull: false },
    fileName: { type: DataTypes.STRING, allowNull: true },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'SET NULL',
    },
    eventDate: { type: DataTypes.DATEONLY, allowNull: true },
    size: { type: DataTypes.BIGINT, allowNull: true },
    duration: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Media',
    tableName: 'media',
    timestamps: true,
    indexes: [
      { fields: ['type'] },
      { fields: ['eventDate'] },
      { fields: ['uploadedBy'] },
    ],
  }
);

export default Media;
