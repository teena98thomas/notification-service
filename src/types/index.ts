export enum Urgency {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

export enum Status{
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export interface User {
    id: number;
    name: string;
    email: string;
    activity: Status;
    notifications: Notification[];
}

export interface Notification {
    id: number;
    message: string;
    urgency: Urgency;
    userId: number;
    user: User;
    createdAt: Date;
    sentAt: Date;
}