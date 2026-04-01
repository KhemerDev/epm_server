import express from 'express';
const router = express.Router();
import * as controller from '../controller/media.js';
import auth from '../mildware/auth.js';

router.get('/', controller.listMedia);
router.get('/:id', controller.getMedia);
router.post('/', auth, controller.createMedia);
router.put('/:id', auth, controller.updateMedia);
router.delete('/:id', auth, controller.deleteMedia);

export default router;
