import Visitor from '../model/Visitor.js';
import { createCrudController } from './crudController.js';

const controller = createCrudController(Visitor);
export const listVisitors = controller.list;
export const getVisitor = controller.getById;
export const createVisitor = controller.create;
export const updateVisitor = controller.update;
export const deleteVisitor = controller.remove;
