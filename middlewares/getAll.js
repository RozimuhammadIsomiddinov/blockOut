const { getAll } = require("../database/product");

module.exports = {
  getMid: async (req, res, next) => {
    try {
      const returned = await getAll();
      if (returned.rowCount == 0)
        return res.status(400).json("products have not yet!");
      res.status(200).json(returned.rows);
      next();
    } catch (err) {
      res.status(400).json("Error from getMid\n" + err.message);
    }
  },
};
