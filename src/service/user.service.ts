import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import 'dotenv/config';

const secret: string = process.env.JWT_SECRET || 'seusecretdetoken';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async createUser(user: User): Promise<string> {
    const userCreated = await this.model.create(user);
    const token = this.generateToken(userCreated);
    return token;
  }

  private generateToken = (user: User): string => {
    const token = jwt.sign(user, secret);
    return token;
  };
}

export default UserService;