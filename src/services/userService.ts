import { UserRepository } from "../repository/userRespository";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class UserService {

    private userRepository = new UserRepository();
    private jwtSecret: jwt.Secret;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.jwtSecret = (process.env.JWT_SECRET || "defaultSecret") as jwt.Secret;
    }

    async createUser(userData: User): Promise<User> {
        try {
            const user = await this.userRepository.create(userData);
            return user;
        } catch (error: any) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }

    async createUserCrypt(userData: any) {
        
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const userWithHashedPass = { ...userData, password: hashedPassword };

        return await this.userRepository.create(userWithHashedPass);
    }

    async getAllUsers() {
        try {
            return await this.userRepository.findAll();
        } catch (error: any) {
             throw new Error(`Erro ao retornar todos os usuário: ${error.message}`);
        }
    }

    async authenticate(email: string, password: string) {
        
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("Usuário ou senha inválidos");

        const passwordOk = await bcrypt.compare(password, user.password);

        if (!passwordOk) throw new Error("Usuário ou senha inválidos");

        const payload = { id: user.id, email: user.email };

        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });

        return { user, token };
  }
}