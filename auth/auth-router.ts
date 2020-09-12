import express from "express";
import * as authMiddleware from "../auth/authenticate-middleware";
import * as authModel from "../auth/authModel";
import bcrypt from "bcryptjs";
import {validateUserInfo} from "./authenticate-middleware";
import jwt from "jsonwebtoken";

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

authRouter.post("/login", async (req, res) => {
    // implement login

    try {
        const {username, password} = req.body;
        const user = await authModel.findByUsername(username).first();

        if (!user) return res.status(401).json({error: "Username invalid"});

        const passValid = await bcrypt.compare(password, user.password);
        if (!passValid) return res.status(401).json({error: "Password invalid"});


        if (!process.env.JWT_SECRET) throw Error("No jwt secret provided");
        //generate a new jwt
        const token = jwt.sign({
            userId: user.id,
        }, process.env.JWT_SECRET);

        res.cookie("token", token);
        res.status(200).json({token, userId: user.id});

    } catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "Error logging in"});
    }
});