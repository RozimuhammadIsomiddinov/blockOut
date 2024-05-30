const { update, search } = require("../database/product");

module.exports = {
  updateMid: async (req, res, next) => {
    try {
      const { name, price, description } = req.body;
      const { id } = req.params;

      await update(id, name, price, description);
      res.status(200).send("succesfully updated\n" + (await search(id)));
      next();
    } catch (er) {
      return res.status(400).send("Error from updateMid\n" + er.message);
    }
  },
};
