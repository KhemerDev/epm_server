import UserRole from '../model/UserRole.js';
import { createCrudController } from './crudController.js';

const controller = createCrudController(UserRole);
export const listUserRoles = controller.list;
export const getUserRole = controller.getById;
export const createUserRole = controller.create;
export const updateUserRole = controller.update;
export const deleteUserRole = controller.remove;
