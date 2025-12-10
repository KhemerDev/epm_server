// import sequelize from '../mildware/db-conn.js';
import User from "../model/User.js";
import argon2 from "argon2";

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, phone, status } = req.body;
    const newUser = await User.create({
      username,
      email,
      password,
      phone,
      status,
    });
    res.status(201).json(newUser);
  } catch (err) {
    switch (err.name) {
      case "SequelizeUniqueConstraintError":
        res
          .status(400)
          .json({ message: "Username ou email já existe.", error: err.errors });
        break;
      case "SequelizeValidationError":
        res
          .status(400)
          .json({ message: "Erro de validação.", error: err.errors });
        break;
      default:
        res.status(500).json({ message: "Erro ao criar usuário.", error: err });
    }

    //
    next(err);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);

    res.json(err);
    // next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({ where: { id: userId } });
    if (deleted) {
      res.status(200).json({ message: "Usuário deletado com sucesso." });
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar usuário.", error: err });
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
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar senha do usuário.", error: err });
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(email);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(`Usuario encontrado: ${user}`);

      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    console.log(user.dataValues.password);
    
    // const validPassword = false;
    const validPassword = await argon2.verify(user.dataValues.password, password);

    if (!validPassword) {
      return res.status(401).json({ message: "Senha inválida." });
    }
    res.status(200).json({ message: "Login bem-sucedido.", user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
