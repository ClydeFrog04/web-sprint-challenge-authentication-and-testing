import * as Knex from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {id: 0, userName: "user1", password: await bcrypt.hash("Pass1", 1)},
        {id: 1, userName: "user2", password: await bcrypt.hash("Pass2", 1)},
    ]);
}
