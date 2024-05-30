const { expect } = require("chai");
const {
  add,
  search,
  update,
  deleteOne,
  getAll,
} = require("../database/product");

describe("Product CRUD Operations", () => {
  describe("add()", () => {
    it("should add a new product", () => {
      const newProduct = add(
        "Test Product",
        10.99,
        "This is a test product"
      ).then((result) => {
        return result;
      });
      expect(newProduct).to.have.property("id");
    });
  });

  describe("search()", () => {
    it("should return a product by ID", async () => {
      const newProduct = await add(
        "Test Product",
        10.99,
        "This is a test product"
      );
      const foundProduct = await search(newProduct.id);
      expect(foundProduct).to.have.property("id", newProduct.id);
      expect(foundProduct).to.have.property("name", "Test Product");
      expect(foundProduct).to.have.property("price", 10.99);
      expect(foundProduct).to.have.property(
        "description",
        "This is a test product"
      );
    });
  });

  describe("update()", () => {
    it("should update an existing product", async () => {
      const newProduct = await add(
        "Test Product",
        10.99,
        "This is a test product"
      );
      await update(
        newProduct.id,
        "Updated Product",
        14.99,
        "This is an updated product"
      );
      const updatedProduct = await search(newProduct.id);
      expect(updatedProduct).to.have.property("name", "Updated Product");
      expect(updatedProduct).to.have.property("price", 14.99);
      expect(updatedProduct).to.have.property(
        "description",
        "This is an updated product"
      );
    });
  });

  describe("deleteOne()", () => {
    it("should delete a product", async () => {
      const newProduct = await add(
        "Test Product",
        10.99,
        "This is a test product"
      );
      await deleteOne(newProduct.id);
      const deletedProduct = await search(newProduct.id);
      expect(deletedProduct).to.be.undefined;
    });
  });

  describe("getAll()", () => {
    it("should return all products", async () => {
      await add("Product 1", 9.99, "Description 1");
      await add("Product 2", 14.99, "Description 2");
      await add("Product 3", 19.99, "Description 3");
      const allProducts = await getAll();
      expect(allProducts.rows.length).to.be.at.least(3);
    });
  });
});
