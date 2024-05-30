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
  add: async (name, price, description) => {
    try {
      const res = await pool.query(
        `
      INSERT INTO product(name, price, description) VALUES ($1, $2, $3)
      `,
        [name, price, description]
      );
      return { id: res.rows[0].id };
    } catch (er) {
      return er.message;
    }
  },
  search: async (id) => {
    try {
      const result = await pool.query(`SELECT * FROM product WHERE id = $1`, [
        id,
      ]);
      return result.rows[0];
    } catch (err) {
      return "Error searching product:\n", err.message;
    }
  },
  update: async (id, name, price, description) => {
    try {
      await pool.query(
        `
    UPDATE  product SET name = $1,price = $2,description = $3 WHERE id =$4`,
        [name, price, description, id]
      );
    } catch (er) {
      return "Error updating product:\n", er.message;
    }
  },
  deleteOne: async (id) => {
    try {
      return await pool.query(`DELETE FROM product WHERE id=$1`, [id]);
    } catch (er) {
      throw new Error("Error deleted!");
    }
  },
  getAll: async () => {
    return await pool.query(`SELECT *FROM product ORDER BY id`);
  },
};
