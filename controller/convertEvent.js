import ConvertEvent from '../model/ConvertEvent.js';
import { createCrudController } from './crudController.js';

const controller = createCrudController(ConvertEvent, 'id');
export const listConvertEvents = controller.list;
export const getConvertEvent = controller.getById;
export const createConvertEvent = controller.create;
export const updateConvertEvent = controller.update;
export const deleteConvertEvent = controller.remove;
