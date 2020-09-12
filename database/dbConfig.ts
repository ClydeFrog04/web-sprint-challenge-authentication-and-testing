const knex = require("knex");

const knexConfig = require("../knexfile.ts");

export const dbConfig = knex(knexConfig.development);
