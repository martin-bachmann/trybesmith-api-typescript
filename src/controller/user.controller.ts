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

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await this.userService.login(username, password);
    if (token === 'ERROR') {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }
    return res.status(statusCodes.OK).json({ token });
  };
}

export default UserController;
