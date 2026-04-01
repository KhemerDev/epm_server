import express from 'express';
const router = express.Router();
import * as controller from '../controller/userRole.js';
import auth from '../mildware/auth.js';

router.get('/', controller.listUserRoles);
router.get('/:id', controller.getUserRole);
router.post('/', auth, controller.createUserRole);
router.put('/:id', auth, controller.updateUserRole);
router.delete('/:id', auth, controller.deleteUserRole);

export default router;
