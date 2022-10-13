import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import UserService from '../service/user.service';

class UserController {
  constructor(private userService = new UserService()) { }

  public createUser = async (req: Request, res: Response) => {
    const user = req.body;

    const token = await this.userService.createUser(user);
    res.status(statusCodes.CREATED).json({ token });
  };
}

export default UserController;