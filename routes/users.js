import express from 'express';
const router = express.Router();
import * as userController from '../controller/user.js';

router.post('/', userController.createUser);
router.get('/', userController.listUsers);
router.delete('/:id', userController.deleteUser);
router.post('/auth/login', userController.loginUser);
export default router;
