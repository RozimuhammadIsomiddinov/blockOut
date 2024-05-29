const { tokens, checker } = require("../middlewares/get");
describe("Token operation", () => {
  it("input should greater than 10, it will throw an error", () => {
    const testpassword = "12354678910";
    expect(() => {
      checker(testpassword);
    }).toThrowError("Parol 10 ta belgidan oshmasligi kerak!");
  });
  it("input should less than 10, it will return true", () => {
    const testpassword1 = "1548";
    expect(() => {
      checker(testpassword1);
    }).not.toThrow();
  });
});
