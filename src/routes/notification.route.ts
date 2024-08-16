import * as express from "express"
import { sendNotification } from '../controllers/notification.controller';

const router = express.Router();

router.post('/send', sendNotification);

export default router;