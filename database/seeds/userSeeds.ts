import * as Knex from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {id: 0, username: "user1", password: "$2a$13$j1GVJANWjvqYwZjm3FG3weXyNZaWZhGNSwL3zGwe/vm/yW/hHouse"},
        {id: 1, username: "user2", password: "$2a$13$y.vtPsCkajlAIzGXWm6W3.gpDWSZoDxz21YMUFOZ5lCESHTQLJ.b2"},
    ]);
}
