import { Request, Response } from 'express';
import { notificationService } from '../services/notification.service';

export const sendNotification = async (req: Request, res: Response) => {
  const { urgency, userId } = req.body;

  try {
    await notificationService.notifyUser(urgency, userId);
    res.status(200).send('Notification scheduled');
  } catch (err) {
    res.status(500).send(err.message);
  }
}