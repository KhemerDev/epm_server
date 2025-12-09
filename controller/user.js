
// import sequelize from "../mildware/db-conn";
// // const User = require("../model/User");

// // Create a new user
// export var createUser = async (req, res, next) => {
//   try {
//     const User = (await import('../model/User.js')).default;
//     console.log("Escrevendo os dados...\n", );
    
//     const { username, email, password, phone } = req.body;
//     console.log(username,email,password,phone);
    
//     const newUser = await User.create({username:username, email:email, password:password, phone:phone});
//     sequelize.close();
//     res.status(201).json(newUser);
//   } catch (err) {
//     console.log("Error: ", );

//     res.json(err)
//     // next(err);
//   }
// };
// export var listUsers = async (req, res, next) => {
//   try {
//     const User = (await import('../model/User.js')).default;
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (err) {
//     next(err);
//   }
// };