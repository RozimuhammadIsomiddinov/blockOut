const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB1_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = {
  add: async (log, pass) => {
    return await pool.query(
      `
      INSERT INTO users(login,parol) VALUES ($1,$2)
      RETURNING id`,
      [log, pass]
    );
  },
  search: async (login) => {
    try {
      const res = await pool.query(`SELECT * FROM users WHERE login = $1`, [
        login,
      ]);
      return res.rows.length > 0;
    } catch (err) {
      console.error("Error searching user:", err);
      throw err;
    }
  },
};
