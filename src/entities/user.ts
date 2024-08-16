import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Notification } from './notification';
import { Status } from '../types';

@Entity()
export class User{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  activity: Status;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
