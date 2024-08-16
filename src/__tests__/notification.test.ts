import { jest } from '@jest/globals';
import { notificationService } from '../services/notification.service';
import { UserRepository } from '../repository/user.repository';
import { EmailService } from '../services/email.service';
import { getNotificationTime } from '../utils/decisionTree';
import { Urgency, Status } from '../types';
import { User } from '../entities/user';

jest.mock('../repository/user.repository');
jest.mock('../services/email.service');
jest.mock('../utils/decisionTree');

describe('NotificationService', () => {
  let mockUserRepository: jest.Mocked<typeof UserRepository>;
  let mockEmailService: jest.Mocked<EmailService>;

  const user: User = ({
    id: '123',
    email: 'test@example.com',
    activity: Status.ACTIVE,
  } as User);

  beforeEach(() => {
    mockUserRepository = UserRepository as jest.Mocked<typeof UserRepository>;
    mockEmailService = new EmailService() as jest.Mocked<EmailService>;

    // Mocking the getNotificationTime utility function
    jest.spyOn(global, 'setTimeout'); // Spy on setTimeout to control timing in tests
    (getNotificationTime as jest.Mock).mockImplementation(({ urgency , activity} ) => {
      if(activity === Status.ACTIVE){
        return 0;
      } else {
        if (urgency === Urgency.HIGH) {
          return  30 * 60 * 1000;
        }
        if(urgency === Urgency.MEDIUM) {
          return 20 * 60 * 60 * 1000;
        }
        if(urgency === Urgency.MEDIUM) {
          return  30 * 60 * 60 * 1000
        } // Default for MEDIUM and LOW
      }
      
    });

    // Mocking the findOne method of the UserRepository
    mockUserRepository.findOne.mockResolvedValue(user);

    (notificationService as any).emailService = mockEmailService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send an email notification after the calculated delay', async () => {
    const urgency: Urgency = Urgency.HIGH;

    await notificationService.notifyUser(urgency, user.id);

    // Delay the execution of email sending
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);

    // Simulate the passage of time
    jest.runOnlyPendingTimers();

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: user.id } });
    expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
      user.email,
      'Notification',
      `This is a ${urgency} urgency notification`
    );
  });

  it('should throw an error if the user is not found', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);

    await expect(notificationService.notifyUser(Urgency.MEDIUM, user.id)).rejects.toThrow('User not found');

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: user.id } });
    expect(mockEmailService.sendEmail).not.toHaveBeenCalled();
  });

  it('should correctly calculate notification time for different urgencies and activity statuses', () => {
    expect(getNotificationTime({ urgency: Urgency.HIGH, activity: Status.ACTIVE })).toBe(0);
    expect(getNotificationTime({ urgency: Urgency.MEDIUM, activity: Status.ACTIVE })).toBe(0);
    expect(getNotificationTime({ urgency: Urgency.LOW, activity: Status.ACTIVE })).toBe(0);
    expect(getNotificationTime({ urgency: Urgency.HIGH, activity: Status.INACTIVE })).toBe(30 * 60 * 1000);
    expect(getNotificationTime({ urgency: Urgency.MEDIUM, activity: Status.INACTIVE })).toBe(20 * 60 * 60 * 1000);
    expect(getNotificationTime({ urgency: Urgency.LOW, activity: Status.INACTIVE })).toBe(30 * 60 * 60 * 1000);
  });
});