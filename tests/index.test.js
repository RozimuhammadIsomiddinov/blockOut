const request = require("supertest");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
describe("API tests", () => {
  it("should return 400 when token is not provided", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(400);
    expect(response.text).toBe("token not Found!!!");
  });

  it("should return 404 when token is invalid", async () => {
    const response = await request(app)
      .get("/")
      .set("x-user-token", "invalid-token");
    expect(response.status).toBe(404);
  });

  it("should return 200 when token is valid", async () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3m",
    });
    const response = await request(app).get("/").set("x-user-token", token);
    expect(response.status).toBe(404);
    expect(response.text).toBe("OK");
  });

  it("should generate a token", async () => {
    const response = await request(app)
      .post("/add")
      .send({ userId: 1, parol: process.env.JWT_SECRET_KEY });
    expect(response.status).toBe(200);
    expect(response.text).toContain("token sended");
  });
});
