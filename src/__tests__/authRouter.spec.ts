// import {dbConfig} from "../dbcofig";
// import supertest from "supertest";
// import {server} from "../server";

import {dbConfig} from "../../database/dbConfig";
import supertest from "supertest";
import {server} from "../../api/server";


afterAll(async () => {
    await dbConfig.destroy();
});

describe("Create a new user", () => {
    describe("When all needed information is provided", () => {
        it("gets the created user back from the server", async () => {
            const newUser = {username: "Eevee", password: "isTheBest"};
            const res = await supertest(server)
                .post("/api/auth/register")
                .set("content-type", "application/json")
                .send(JSON.stringify(newUser));

            //not testing the password because that should never be returned to the user
            expect(res.status).toBe(201);
            expect(res.body.username).toBe(newUser.username);
        });
    });

    describe("When incomplete information is provided", () => {
        it("gets an error message and 400 back from the server", async () => {
            const newUser = {username: "Eevee"};
            const res = await supertest(server)
                .post("/api/auth/register")
                .set("content-type", "application/json")
                .send(JSON.stringify(newUser));

            //not testing the password because that should never be returned to the user
            expect(res.status).toBe(400);
            expect(res.body.username).toBe(undefined);
            expect(res.body.error).toBe("Username or password missing");
        });
    });
});