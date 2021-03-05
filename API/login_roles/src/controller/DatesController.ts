import { Dates } from './../entity/Dates';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/User';
import { validate } from 'class-validator';

export class DatesController {
  static getAll = async (req: Request, res: Response) => {
    const datesRepository = getRepository(Dates);
    let dates;

    try {
      dates = await datesRepository.find({relations:["user"]});
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong dates error!' });
    }

    if (dates.length > 0) {
      res.send(dates);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const datesRepository = getRepository(Dates);
    const userRepository = getRepository(Users);

    try {
      const date = await datesRepository.findOneOrFail(id,{relations:["user"]});
      res.send(date);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  }

  static newDate = async (req: Request, res: Response) => {
    const { asunto, descripcion, forario,fecha,area,estado,userId } = req.body;
    const date = new Dates();
    const userRepository = getRepository(Users);
    try {
              const user = await userRepository.findOneOrFail(userId);
              date.asunto = asunto;
              date.descripcion= descripcion;
              date.forario= forario;
              date.fecha = fecha;
              date.area=area;
              date.estado = estado;
              date.user = userId;
            } catch (e) {
              res.status(404).json({ message: 'User not found' });
            }
    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(date, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    const dateRepository = getRepository(Dates);
    try {
      await dateRepository.save(date);
    } catch (e) {
      return res.status(409).send(e);
    }
    // All ok
    res.send('Date created');
  }

  static edit = async (req: Request, res: Response) => {
    let date;
    const { id } = req.params;
    const { asunto, descripcion, forario,fecha,area,estado,userId} = req.body;

    const dateRepository = getRepository(Dates);
    // Try get user
    try {
      date = await dateRepository.findOneOrFail(id);
              date.asunto = asunto;
              date.descripcion= descripcion;
              date.forario= forario;
              date.fecha = fecha;
              date.area=area;
              date.estado = estado;
              date.user = userId;
    } catch (e) {
      return res.status(404).json({ message: 'Date not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(date, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await dateRepository.save(date);
    } catch (e) {
      return res.status(409).json({ message: 'Date already in use' });
    }

    res.status(201).json({ message: 'Date update' });
  }

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const dateRepository = getRepository(Dates);
    let date: Dates;

    try {
      date = await dateRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Date not found' });
    }

    // Remove user
    dateRepository.delete(id);
    res.status(201).json({ message: ' Date deleted' });
  }
}

export default DatesController;
