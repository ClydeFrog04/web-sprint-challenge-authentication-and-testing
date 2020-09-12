import express from "express";
import * as authMiddleware from "../auth/authenticate-middleware";
import * as authModel from "../auth/authModel";

export const authRouter = express.Router();

authRouter.post("/register", authMiddleware.validateUserInfo, async (req, res) => {
    // implement registration
    try {
        const {username, password} = req.body;
        return authModel.createUser()
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error registering new user"});
    }
});

authRouter.post("/login", (req, res) => {
    // implement login
});


/*
usersRouter.post("/register",  async (req, res) => {
    try {
        const {username, password, department} = req.body;
        const user = await usersModel.findBy({username}).first();

        if(user) return res.status(409).json({message: "Username is already taken"});

        const newUser = await usersModel.add({
            username,
            password: await brcypt.hash(password, 13),
            department
        });
        res.status(201).json(newUser);
    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error registering new user"});
    }
});
 */