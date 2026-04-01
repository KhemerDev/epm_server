import Convert from '../model/Convert.js';
import { createCrudController } from './crudController.js';

const controller = createCrudController(Convert);
export const listConverts = controller.list;
export const getConvert = controller.getById;
export const createConvert = controller.create;
export const updateConvert = controller.update;
export const deleteConvert = controller.remove;
