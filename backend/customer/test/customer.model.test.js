const mongoose = require("mongoose");
const { CustomerModel } = require("../src/database/models");
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
  await CustomerModel.deleteMany();
});

describe("Customer Model Test", () => {
  it("should create & save customer successfully", async () => {
    const userData = {
      username: "test",
      email: "test@test.com",
      password: "12345678",
      birthday: "1990-01-01",
      gender: "male",
      role: "user",
      phone: "1234567890",
    };
    const validUser = new CustomerModel(userData);
    const savedUser = await validUser.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.birthday).toBe(userData.birthday);
    expect(savedUser.gender).toBe(userData.gender);
    expect(savedUser.role).toBe(userData.role);
    expect(savedUser.phone).toBe(userData.phone);
  });
});
