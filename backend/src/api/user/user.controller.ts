import {Request, Response} from 'express';
import {User} from '@monorepo-boilerplate/api-models';
import {ServiceResponseBuilder} from "@monorepo-boilerplate/api-response";

export default class UserController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    const users = await User.find();

    res.status(200).send(new ServiceResponseBuilder(users));
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    const user = await User.findById(req.params.id);

    res.status(200).send(new ServiceResponseBuilder(user));
  };

  public create = async (req: Request, res: Response): Promise<any> => {
    const {name, lastName, email, password} = req.body;
    const user = await User.create({name, lastName, email, password});

    res.status(201).send(new ServiceResponseBuilder(user).setMessage('User Successfully created'));
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    const {name, lastName, email, password} = req.body;
    const userUpdated = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        name,
        lastName,
        email,
        password
      }
    });

    res.status(200).send(new ServiceResponseBuilder(userUpdated));
  };

  public remove = async (req: Request, res: Response): Promise<any> => {
    await User.findByIdAndRemove(req.params.id);

    res.status(204).send();
  };
}
