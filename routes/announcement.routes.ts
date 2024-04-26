import { Router } from 'express';
import {createAnnouncement, getAnnouncement, getAnnouncementsById, updateAnnouncements, deleteAnnouncements} from '../controllers/announcement.controller';
import { managerAuth} from '../middlewares/authMiddleware'; 

const router = Router();

router.post('/',managerAuth, createAnnouncement);
router.get('/',managerAuth, getAnnouncement);
router.get('/:id',managerAuth, getAnnouncementsById);
router.put('/:id',managerAuth, updateAnnouncements);
router.delete('/:id',managerAuth, deleteAnnouncements);


export default router;