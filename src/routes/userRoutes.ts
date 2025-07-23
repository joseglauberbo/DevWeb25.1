import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";
import { UserRepository } from "../repository/userRespository";
import { authenticateJWT } from "../middlewares/authMiddleware";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = Router();

router.post("/", (req, res, next) => {
    try {
        userController.createUser(req, res).catch(next);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter os usuários", error: error.message });
    }
});

router.post("/login", async (req, res) => {
  try {
    await userController.login(req, res);
  } catch (error: any) {
    res.status(401).json({ message: "Falha na autenticação", error: error.message });
  }
});

router.get("/", authenticateJWT, async (req, res) => {
    try {
        await userController.getUsers(req, res);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter os usuários", error: error.message });
    }
});

export default router;
