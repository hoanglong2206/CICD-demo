const mongoose = require("mongoose");
const { ProductModel } = require("../src/database/models");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo = null;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
});

afterEach(async () => {
  await ProductModel.deleteMany();
});

describe("Product Model Test", () => {
  it("should create & save product successfully", async () => {
    const productData = {
      name: "test",
      price: 100,
      description: "description",
      category: "category",
      brand: "brand",
      inStock: true,
    };
    const validProduct = new ProductModel(productData);
    const savedProduct = await validProduct.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(productData.name);
    expect(savedProduct.price).toBe(productData.price);
    expect(savedProduct.description).toBe(productData.description);
    expect(savedProduct.category).toBe(productData.category);
    expect(savedProduct.brand).toBe(productData.brand);
    expect(savedProduct.inStock).toBe(productData.inStock);
  });
});
