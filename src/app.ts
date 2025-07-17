import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const prisma = new PrismaClient();

// Middlewares e rotas
app.use("/api", router);

// Inicialização do servidor
async function startServer() {
  try {
    // Testa conexão com o banco
    await prisma.$connect();
    console.log("✅ Conectado ao banco de dados com sucesso.");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
}

// Tratamento global de erros não capturados
process.on("uncaughtException", (err) => {
  console.error("Erro não tratado:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Promessa rejeitada não tratada:", reason);
  process.exit(1);
});

startServer();

export default app;
