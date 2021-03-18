import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { Users } from '../entity/User';

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { uI } = res.locals.jwtPayload;
    
    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(uI);
    } catch (e) {
      return res.status(401).json({ message: 'Not Authorized' });
    }
//check
    const { role } = user;
    if (roles.includes(role)) {
      next();
    } else {
      res.status(401).json({ message: 'Not Authorized role' });
    }
  };
};
