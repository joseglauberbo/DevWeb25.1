import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body; 
      const user = await this.userService.createUserCrypt(userData);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.json(users);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao obter os usuários", error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const authResult = await this.userService.authenticate(email, password);
      return res.json(authResult);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
