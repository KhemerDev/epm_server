import Member from '../model/Member.js';
import { createCrudController } from './crudController.js';

const controller = createCrudController(Member);
export const listMembers = controller.list;
export const getMember = controller.getById;
export const createMember = controller.create;
export const updateMember = controller.update;
export const deleteMember = controller.remove;
export const getMembersCount = controller.getNumber;