/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import * as authModel from "../auth/authModel";

export const restrict = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authError = {message: "Invalid credentials provided"};

        const token = req.headers.authorization ?? req.cookies.token;//checking for both depending on what the client provides

        if (!token) return res.status(401).json(authError);

        jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
            if (err) return res.status(401).json(authError);
            next();
        });
    } catch (e) {
        console.log(e.stack);
    }
};

export const validateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.username || !req.body.password) return res.status(409).json({error: "Username or password missing"});

        const userExists = await authModel.findByUsername(req.body.username).first();
        console.log("Userexists", userExists);

        if (!userExists) next();
        else return res.status(400).json({error: "Username already taken"});
    } catch (e) {
        console.log(e.stack);
    }
};