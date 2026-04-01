import express from 'express';
const router = express.Router();
import * as userController from '../controller/user.js';
import  seedAdmin  from '../seeders/admin-user-seed.js';

router.post('/', userController.createUser);
router.get('/', userController.listUsers);
router.delete('/:id', userController.deleteUser);
router.post('/auth/login', userController.loginUser);
router.put('/auth/signup', userController.createUser);
// router.get("/admin", seedAdmin);
export default router;
