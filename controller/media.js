import Media from '../model/Media.js';
import { createCrudController } from './crudController.js';

const controller = createCrudController(Media);
export const listMedia = controller.list;
export const getMedia = controller.getById;
export const createMedia = controller.create;
export const updateMedia = controller.update;
export const deleteMedia = controller.remove;
