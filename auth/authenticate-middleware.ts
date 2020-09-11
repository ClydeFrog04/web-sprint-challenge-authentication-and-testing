/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const restrict = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authError = {message: "Invalid credentials provided"};

        const token = req.headers.authorization ?? req.cookies.token;//checking for both depending on what the client provides

        if (!token) return res.status(401).json(authError);

        jwt.verify(token, process.env.JWT_SECRET!, (err:any, decoded:any) =>{
            if(err) return res.status(401).json(authError);
            next();
        });
    } catch (e) {
        console.log(e.stack);
    }

};