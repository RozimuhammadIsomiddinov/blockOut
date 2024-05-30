const { add, search } = require("../database/product");

module.exports = {
  createMid: async (req, res, next) => {
    const { name, price, description } = req.body;
    try {
      const { id, error } = await add(name, price, description);
      if (error) {
        return res.status(401).send("Error from add:\n" + error);
      }
      const product = await search(id);

      res.status(201).send("Successfully added:");
      next();
    } catch (err) {
      return res.status(400).send("Error from createMid:\n" + err.message);
    }
  },
};
