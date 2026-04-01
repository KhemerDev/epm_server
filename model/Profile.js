import { DataTypes, Model } from 'sequelize';
import sequelize from '../mildware/db-conn.js';
import User from './User.js';

class Profile extends Model {}

Profile.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    fullName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    avatarUrl: { type: DataTypes.STRING(500), allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles',
    timestamps: true,
    indexes: [{ fields: ['userId'] }],
  }
);
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });
export default Profile;
