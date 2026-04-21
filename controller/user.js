// import sequelize from '../mildware/db-conn.js';
import {User, Profile} from "../model/index.js";
import UserController from "../model/User.js";
import UserRole from "../model/UserRole.js";
import ProfileController from "../model/Profile.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    const { fullName, email, password, phone, status } = req.body;
    const newUser = await User.create({
      fullName,
      email,
      password,
      phone,
      status,
    });
    console.log(newUser.dataValues.id);
  
    let role = await UserRole.create({
      userId: newUser.dataValues.id,
      role: 'membro'
    });
    // let role= await setUserRole(newUser.dataValues.id, 'membro');
    if(role){     
       console.log("Role do usuário definida como 'membro'.");
      return res.status(201).json(newUser);
    } else {
      console.log("Falha ao definir role do usuário.");
return res.status(500).json({ message: "Erro ao criar usuário.", error: "Falha ao definir role do usuário." });
    }
  } catch (err) {
    
    switch (err.name) {
      case "SequelizeUniqueConstraintError":
        console.log("Email Ja Existe");
        
        // res
        //   .status(400)
        //   .json({ message: "Username ou email já existe.", error: err.errors });
        return res
          .status(400)
          .json({ message: "Email já existe.", error: err.errors });
        break;
      case "SequelizeValidationError":
        console.log("Erro de validação:", err.errors);

        return res
          .status(400)
          .json({ message: "Erro de validação.", error: err.errors });
        break;
      default:
        // res.status(500).json({ message: "Erro ao criar usuário.", error: err });
      console.log("Erro do Servidor", err);
      }

    //
    next(err);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
   return res.status(200).json(users);
  } catch (err) {
    console.log(err);

   return res.json(err);
    // next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({ where: { id: userId } });
    if (deleted) {
      return res.status(200).json({ message: "Usuário deletado com sucesso." });
    } else {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Erro ao deletar usuário.", error: err });
    next(err);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { password, user } = req.body;
    const verifyUser = await User.findOne({
      where: { id: userId, username: user },
    });
    if (!verifyUser) {
      return res.status(404).json({ message: "Wrong passoword" });
    }
    const [updated] = await User.update(
      { password },
      { where: { id: userId } }
    );
    if (updated) {
      const updatedUser = await User.findOne({ where: { id: userId } });
     return res.status(200).json(updatedUser);
    } else {
     return res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar senha do usuário.", error: err });
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserController.findOne({
      where: { email },
      include: [
        {
          model: ProfileController,
          as: 'profile',
          required: false
        },
        {
          model: UserRole,
          as: 'userRoles',
          required: false
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const validPassword = await argon2.verify(user.dataValues.password, password);

    if (!validPassword) {
      return res.status(401).json({ message: "Senha inválida." });
    }

    // Extrair roles em array
    const roles = user.userRoles ? user.userRoles.map(role => role.role) : [];

    // Preparar dados do usuário
    const userData = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      avatar_url: user.profile ? user.profile.avatarUrl : null,
      roles: roles
    };

    // Gerar token JWT
    const jwtKey = process.env.JWT_SECRET || 'supersecretkey';
    const token = jwt.sign(
      {
        user: user.fullName,
        email: user.email,
        id: user.id,
        roles: roles
      },
      jwtKey,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      email: user.email,
      user: userData,
      token: token
    });

  } catch (err) {
    console.log("error do Servidor", err);
    next(err);
  }


 
}


