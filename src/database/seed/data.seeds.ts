import { UserEntity } from '../entity/user.entity';

export const users: Partial<UserEntity>[] = [
  {
    username: 'bleek42',
    email: 'admin@bleek.dev',
    password: 'Passwerd123!',
    ambassador: true,
    admin: true,
    created: new Date(),
    updated: new Date('11-7-2021'),
  },
  {
    username: 'fk.yr.face666',
    email: 'fk.yr.face666@outlook.com',
    password: 'Passwerd123!',
    ambassador: true,
    admin: false,
    created: new Date(),
    updated: new Date('11-7-2021'),
  },
  {
    username: 'chow_yun_fat365',
    email: 'chow_yun_fat365@gmail.com',
    password: 'Chop_ya_neck32',
    ambassador: true,
    admin: false,
    created: new Date(),
    updated: new Date('11-7-2021'),
  },
  {
    username: 'SuperCusty123',
    email: 'super.custy123@aol.com',
    password: '123takeMy$',
    ambassador: false,
    admin: false,
    created: new Date(),
    updated: new Date('11-7-2021'),
  },
  {
    username: 'slam-pig247',
    email: 'throat-whore44@gmail.com',
    password: 'luvz2swallowCum!',
    ambassador: false,
    admin: false,
    created: new Date(),
    updated: new Date('11-7-2021'),
  },
];
