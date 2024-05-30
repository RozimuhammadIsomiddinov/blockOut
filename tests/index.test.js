const request = require("supertest");
const app = require("../index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
describe("Product API", () => {
  let token;

  beforeAll(() => {
    // Generate a test token
    const payload = { id: 1 };
    token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
  });

  describe("GET /products", () => {
    test("should return a list of products", async () => {
      const response = await request(app).get("/products");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("POST /products/add", () => {
    test("should create a new product", async () => {
      const productData = {
        name: "Test Product",
        description: "This is a test product",
        price: 10.99,
      };

      const response = await request(app)
        .post("/products/add")
        .set("Authorization", `Bearer ${token}`)
        .send(productData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: productData.name,
          description: productData.description,
          price: productData.price,
        })
      );
    });
  });

  describe("PUT /products/:id", () => {
    test("should update an existing product", async () => {
      const productData = {
        name: "Updated Test Product",
        description: "This is an updated test product",
        price: 15.99,
      };

      const response = await request(app)
        .put("/products/1")
        .set("Authorization", `Bearer ${token}`)
        .send(productData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 1,
          name: productData.name,
          description: productData.description,
          price: productData.price,
        })
      );
    });
  });

  describe("DELETE /products/:id", () => {
    test("should delete a product", async () => {
      const response = await request(app)
        .delete("/products/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Product deleted successfully",
      });
    });
  });
});
