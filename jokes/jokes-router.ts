import axios from "axios";
import express, {Request, Response, NextFunction} from "express";

export const jokesRouter = express.Router();

jokesRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    const requestOptions = {
        headers: {accept: "application/json"},
    };

    axios
        .get("https://icanhazdadjoke.com/search", requestOptions)
        .then(response => {
            res.status(200).json(response.data.results);
        })
        .catch(err => {
            res.status(500).json({message: "Error Fetching Jokes", error: err});
        });
});
