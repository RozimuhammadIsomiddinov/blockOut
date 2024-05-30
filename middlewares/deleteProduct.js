const { deleteOne, search } = require("../database/product");

module.exports = {
  deleteMid: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (
        search(id).then((result) => {
          return result;
        })
      )
        return res.status(404).send("it's have'nt in DB");
      const deleted = await deleteOne(id); //returned his object and property of rows are empty
      res.status(204).send("succesfully deleted");
      next();
    } catch (er) {
      return res.status(400).send("Error from deleteMid" + er.message);
    }
  },
};
