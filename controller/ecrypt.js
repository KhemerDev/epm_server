import {ecryptService} from "../service/ecrypt.js";

class EcryptController {
  async ecrypt(req, res) {
    try {
      const { text } = req.body;
      const ecryptedText = await ecryptService.ecrypt(text);
      return res.json({ ecryptedText });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async decrypt(req, res) {
    try {
      const { ecryptedText } = req.body;
      const decryptedText = await ecryptService.decrypt(ecryptedText);
      return res.json({ decryptedText });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new EcryptController();
export const createUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const { password } = req.body;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
      user.password = password;
      await user.save();
      res.status(200).json({ message: 'Senha atualizada com sucesso.' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar senha.', error: err });
      next(err);
    }
  }

