import express from "express";
import cors from "cors";
import helmet from "helmet";


import {authRouter} from "../auth/auth-router";
import {jokesRouter} from "../jokes/jokes-router";
import * as authenticate from "../auth/authenticate-middleware";

export const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);

//@ts-ignore
server.use("/api/jokes", authenticate.restrict, jokesRouter);
