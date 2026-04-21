export const createCrudController = (Model, keyName = 'id') => ({
  list: async (req, res, next) => {
    try {
      const records = await Model.findAll();
      res.status(200).json(records);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const id = req.params[keyName];
      const record = await Model.findByPk(id);
      if (!record) {
        return res.status(404).json({ message: `${Model.name} não encontrado.` });
      }
      res.status(200).json(record);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const newRecord = await Model.create(req.body);
      res.status(201).json(newRecord);
    } catch (err) {      
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const id = req.params[keyName];
      const [updatedCount] = await Model.update(req.body, { where: { [keyName]: id } });
      if (!updatedCount) {
        return res.status(404).json({ message: `${Model.name} não encontrado.1` });
      }
      const updated = await Model.findByPk(id);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      const id = req.params[keyName];
      const deletedCount = await Model.destroy({ where: { [keyName]: id } });
      if (!deletedCount) {
        return res.status(404).json({ message: `${Model.name} não encontrado.` });
      }
      res.status(200).json({ message: `${Model.name} deletado com sucesso.` });
    } catch (err) {
      next(err);
    }
  },
  getNumber: async (req, res, next) => {
    try {
      const count = await Model.count();
      res.status(200).json({ count });
      console.log(count);
    } catch (err) {
      console.log(err);
      
      next(err);
    }
  }
});
