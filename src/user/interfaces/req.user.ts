import { Request } from 'express';
import { User } from '../../database/entity/user.entity';

export interface ReqUser extends Request {
  user?: User;
}
