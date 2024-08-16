import { text } from 'body-parser';
import  {Notification}  from '../entities/notification';
import { Urgency, Status } from '../types';
import { EmailService } from './email.service';
import { getCustomRepository, getRepository } from 'typeorm';

import { config } from 'dotenv';
import { User } from '../entities/user';
import { getNotificationTime } from '../utils/decisionTree';
import { UserRepository } from '../repository/user.repository';
config();


class NotificationService {
    private emailService;

    constructor() {
      this.emailService = new EmailService();
    }

    notifyUser = async(urgency: Urgency, userId: string) => {
      const user = await UserRepository.findOne({ where: { id: userId } });
    
      if (!user) {
        throw new Error('User not found');
      }
    
      const delay = getNotificationTime({ urgency, activity: user.activity });
    
      setTimeout(() => {
        this.emailService.sendEmail(user.email, 'Notification', `This is a ${urgency} urgency notification`);
      }, delay);
    }
  
}

export const notificationService = new NotificationService();
