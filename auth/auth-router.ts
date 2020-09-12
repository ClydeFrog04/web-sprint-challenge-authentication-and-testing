import express from "express";
import * as authMiddleware from "../auth/authenticate-middleware";
import * as authModel from "../auth/authModel";
import bcrypt from "bcryptjs";

export const authRouter = express.Router();

authRouter.post("/register", authMiddleware.validateUserInfo, async (req, res) => {
    // implement registration
    try {
        console.log("getting here");
        const {username, password} = req.body;

        const newUser = await authModel.createUser({
            username,
            password: await bcrypt.hash(password, 13)
        });
        res.status(201).json(newUser);

    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error registering new user"});
    }
});

authRouter.post("/login", (req, res) => {
    // implement login
});