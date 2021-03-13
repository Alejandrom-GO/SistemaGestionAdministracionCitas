import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/User';
import { validate } from 'class-validator';

export class UserController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(Users);
    let users;

    try {
      users = await userRepository.find();
    } catch (e) {
      res.status(404).json({code:404, message: 'Somenthing goes wrong!' });
    }

    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).json({ code:404, message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    try {
      const user = await userRepository.findOneOrFail(id);
      res.send(user);
    } catch (e) {
      res.status(404).json({code:404, message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { username, password, role, area, name,  typeUser } = req.body;
    const user = new Users();

    user.username = username;
    user.password = password;
    user.role = role;
    user.area = area;
    user.name = name;
    user.typeUser = typeUser;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD

    const userRepository = getRepository(Users);
    try {
      user.hashPassword();
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ code:409, message: 'Username already exist' });
    }
    // All ok
    res.status(201).json({code : 201,message : 'User created'});
  };

  static edit = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { username, role } = req.body;

    const userRepository = getRepository(Users);
    // Try get user
    try {
      user = await userRepository.findOneOrFail(id);
      user.username = username;
      user.role = role;
    } catch (e) {
      return res.status(404).json({ code: 404, message: 'User not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({code: 409, message: 'Username already in use' });
    }

    res.status(201).json({ code: 201, message: 'User update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ code: 404,message: 'User not found' });
    }

    // Remove user
    userRepository.delete(id);
    res.status(201).json({ code:201, message: ' User deleted' });
  };
}

export default UserController;
