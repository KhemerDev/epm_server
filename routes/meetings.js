import express from 'express';
const router = express.Router();
import * as controller from '../controller/meeting.js';
import auth from '../mildware/auth.js';

router.get('/', controller.listMeetings);
router.get('/:id', controller.getMeeting);
router.post('/', auth, controller.createMeeting);
router.put('/:id', auth, controller.updateMeeting);
router.delete('/:id', auth, controller.deleteMeeting);

export default router;
