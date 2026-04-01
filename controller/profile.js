import Profile from '../model/Profile.js';
import { createCrudController } from './crudController.js';

const controller = createCrudController(Profile);
export const listProfiles = controller.list;
export const getProfile = controller.getById;
export const createProfile = controller.create;
export const updateProfile = controller.update;
export const deleteProfile = controller.remove;
