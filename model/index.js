import User from './User.js';
import UserRole from './UserRole.js';
import Profile from './Profile.js';
import Member from './Member.js';
import Convert from './Convert.js';
import Media from './Media.js';
import Visitor from './Visitor.js';
import Meeting from './Meeting.js';
import ConvertEvent from './ConvertEvent.js';

// Associations, se necessário:
User.hasMany(UserRole, { foreignKey: 'userId', as: 'userRoles', onDelete: 'CASCADE' });
UserRole.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Profile, { foreignKey: 'userId', as: 'profile', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Convert, { foreignKey: 'referredBy', onDelete: 'SET NULL' });
Convert.belongsTo(User, { foreignKey: 'referredBy' });
User.hasMany(Media, { foreignKey: 'uploadedBy', onDelete: 'SET NULL' });
Media.belongsTo(User, { foreignKey: 'uploadedBy' });
User.hasMany(Meeting, { foreignKey: 'organizedBy', onDelete: 'SET NULL' });
Meeting.belongsTo(User, { foreignKey: 'organizedBy' });
Convert.hasMany(ConvertEvent, { foreignKey: 'convertId', onDelete: 'CASCADE' });
ConvertEvent.belongsTo(Convert, { foreignKey: 'convertId' });
User.hasMany(ConvertEvent, { foreignKey: 'responsibleUser', onDelete: 'SET NULL' });
ConvertEvent.belongsTo(User, { foreignKey: 'responsibleUser' });

export {
  User,
  UserRole,
  Profile,
  Member,
  Convert,
  Media,
  Visitor,
  Meeting,
  ConvertEvent,
};
