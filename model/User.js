var {DataTypes, Model}= require('sequelize');
const sequelize= require('../mildware/db-conn');

class User extends Model{};

User.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true
    }
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  phone:{
    type: DataTypes.STRING,
    allowNull: true
  },
  level:{
    type: DataTypes.STRING,
    allowNull: true
  }

},{
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true
});
await User.sync();

// module.exports= User;  
export default User;