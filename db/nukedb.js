#! /usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");

const SQL = `
DROP TABLE games CASCADE;
DROP TABLE genres CASCADE;
DROP TABLE devs CASCADE;
DROP TABLE game_dev CASCADE;
DROP TABLE game_genre CASCADE;
`;

async function main() {
  console.log("seeding...");
  try {
    const client = new Client({
      connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  } catch (err) {
    console.error(err);
  }
}

main();
