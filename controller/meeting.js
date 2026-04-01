import Meeting from '../model/Meeting.js';
import { createCrudController } from './crudController.js';

const controller = createCrudController(Meeting);
export const listMeetings = controller.list;
export const getMeeting = controller.getById;
export const createMeeting = controller.create;
export const updateMeeting = controller.update;
export const deleteMeeting = controller.remove;
