const { add, search } = require("../database/user");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB1_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
describe("User operations", () => {
  it("add should insert a new user and return the id", () => {
    const login = "testuser";
    const password = "testpassword";
    add(login, password).then((result) => {
      expect(result[0].id).toBeDefined();
    });
  });
  it("search should return the user with the given login", () => {
    const login = "testuser";
    search(login).then((users) => {
      expect(users).toBe(false);
    }); //true or false
  });
});
