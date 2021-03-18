import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';


class AuthController {
    static login = async (req: Request, res: Response) => {
        const {username, password} = req.body;

        if(!(username && password)){
            return res.status(400).json({ code: 400, message: 'Username & Password are required!'});
        }
        const userRepository = getRepository(Users);
        let user : Users;
        try {
            user = await userRepository.findOneOrFail({where:{username},relations:["typeUser"]},);
        } catch (error) {
            return res.status(400).json({code: 405,message : 'Username or Password incorrect'});
        }
        //Check Password
        if(!user.checkPassword(password)){
            return res.status(400).json({code: 400, message: 'Username or Password incorrect'})
        }

        const token = jwt.sign({ uI: user.id, uN: user.username, uR: user.typeUser.id, uA: user.area }, config.jwtSecret, { expiresIn: '1h' });

        const usrs = await userRepository.findOneOrFail(user.id,{relations:["typeUser"]});

        res.send( {code: 200 ,message: 'OK', token, role: usrs.typeUser.id, area: usrs.area, mat: usrs.username, userId: user.id});
    }
}

export default AuthController;