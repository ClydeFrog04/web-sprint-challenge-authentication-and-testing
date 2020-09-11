/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
import {Request, Response, NextFunction} from "express";

export const restrict = (req:Request, res:Response, next:NextFunction) => {
  res.status(401).json({ you: 'shall not pass!' });
};
