import express from "express";
import cors from "cors";
import helmet from "helmet";


//todo: Change these to proper import statements
const authenticate = require("../auth/authenticate-middleware.ts");
const authRouter = require("../auth/auth-router.ts");
const jokesRouter = require("../jokes/jokes-router.ts");

export const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);
