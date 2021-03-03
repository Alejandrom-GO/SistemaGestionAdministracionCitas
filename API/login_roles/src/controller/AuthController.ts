import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';


class AuthController {
    static login = async (req: Request, res: Response) => {
        const {username, password} = req.body;

        if(!(username && password)){
            return res.status(400).json({message: 'Username & Password are required!'});
        }
        const userRepository = getRepository(Users);
        let user : Users;
        try {
            user = await userRepository.findOneOrFail({where:{username}});
        } catch (error) {
            return res.status(400).json({message : 'Username or Password incorrect'});
        }
        //Check Password
        if(!user.checkPassword(password)){
            return res.status(400).json({message: 'Username or Password incorrect'})
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });
        res.send( {message: 'OK', token, userId: user.id, role: user.role});
    }
}

export default AuthController;