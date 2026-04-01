import express from 'express';
const router = express.Router();
import * as controller from '../controller/profile.js';
import auth from '../mildware/auth.js';

router.get('/', controller.listProfiles);
router.get('/:id', controller.getProfile);
router.post('/', auth, controller.createProfile);
router.put('/:id', auth, controller.updateProfile);
router.delete('/:id', auth, controller.deleteProfile);

export default router;
