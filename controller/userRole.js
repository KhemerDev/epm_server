import UserRole from '../model/UserRole.js';
import { createCrudController } from './crudController.js';

const controller = createCrudController(UserRole);
export const listUserRoles = controller.list;
export const getUserRole = controller.getById;
export const createUserRole = controller.create;
export const updateUserRole = controller.update;
export const deleteUserRole = controller.remove;


export const setUserRole = async (userId, role) => {
    try {
      const user = await User.findByPk(userId);     
         if (!user) { 
        throw new   Error({ message: "Usuário não encontrado." });
        }
        const newRole= await UserRole.create({ userId, role });
        return newRole;
         // return { message: "Role do usuário atualizada com sucesso.", userRole };
        } catch (err) {
         throw new Error("Erro ao atualizar role do usuário.");
        }
    }