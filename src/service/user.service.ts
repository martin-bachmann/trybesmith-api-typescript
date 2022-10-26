import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import { generateToken } from '../utils/JWT';
import 'dotenv/config';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async createUser(user: User): Promise<string> {
    const userCreated = await this.model.create(user);
    const token = generateToken(userCreated);
    return token;
  }

  public async login(username: string, password: string): Promise<string> {
    const user = await this.model.findUserByUsername(username, password);
    if (!user) return 'ERROR';
    const token = generateToken(user);
    return token;
  }
}

export default UserService;