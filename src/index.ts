import express from "express";
import * as dotenv from "dotenv";
import  sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(express.json());

// Usar as rotas do usuário
app.use("/users", userRoutes);

// Testando a conexão e inicializando o servidor
sequelize.sync({ force: false }).then(() => {
  console.log("Banco de dados conectado!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
});