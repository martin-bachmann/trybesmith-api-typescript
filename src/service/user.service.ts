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
    const payload = { id: user.id, name: user.username };
    const token = jwt.sign(payload, secret);
    return token;
  };

  public async login(username: string, password: string): Promise<string> {
    const user = await this.model.findUserByUsername(username, password);
    if (!user) return 'ERROR';
    const token = this.generateToken(user);
    return token;
  }
}

export default UserService;