const mongoose = require("mongoose");
const { OrderModel, CartModel } = require("../src/database/models");
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
  await OrderModel.deleteMany();
  await CartModel.deleteMany();
});

describe("Order Model Test", () => {
  it("should create & save order successfully", async () => {
    const orderData = {
      orderId: "test",
      customerId: "test",
      amount: 100,
      status: "test",
      txnId: "test",
      items: [
        {
          product: {
            _id: "test",
            name: "test",
            description: "test",
            imageCover: "test",
            size: "test",
            color: "test",
            price: 100,
            unit: 1,
            brand: "test",
          },
        },
      ],
    };
    const validOrder = new OrderModel(orderData);
    const savedOrder = await validOrder.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedOrder._id).toBeDefined();
    expect(savedOrder.orderId).toBe(orderData.orderId);
    expect(savedOrder.customerId).toBe(orderData.customerId);
    expect(savedOrder.items[0].product._id).toBe(
      orderData.items[0].product._id
    );
    expect(savedOrder.items[0].product.name).toBe(
      orderData.items[0].product.name
    );
    expect(savedOrder.items[0].product.imageCover).toBe(
      orderData.items[0].product.imageCover
    );
    expect(savedOrder.items[0].product.size).toBe(
      orderData.items[0].product.size
    );
    expect(savedOrder.items[0].product.color).toBe(
      orderData.items[0].product.color
    );
    expect(savedOrder.items[0].product.price).toBe(
      orderData.items[0].product.price
    );
    expect(savedOrder.items[0].product.unit).toBe(
      orderData.items[0].product.unit
    );
    expect(savedOrder.items[0].product.brand).toBe(
      orderData.items[0].product.brand
    );
  });
});

describe("Cart Model Test", () => {
  it("should create & save cart successfully", async () => {
    const cartData = {
      customerId: "test",
      items: [
        {
          product: {
            _id: "test",
            name: "test",
            imageCover: "test",
            size: "test",
            color: "test",
            price: 100,
            unit: 1,
            brand: "test",
          },
          unit: 1,
        },
      ],
    };
    const validCart = new CartModel(cartData);
    const savedCart = await validCart.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedCart._id).toBeDefined();
    expect(savedCart.customerId).toBe(cartData.customerId);
    expect(savedCart.items[0].product._id).toBe(cartData.items[0].product._id);
    expect(savedCart.items[0].product.name).toBe(
      cartData.items[0].product.name
    );
    expect(savedCart.items[0].product.imageCover).toBe(
      cartData.items[0].product.imageCover
    );
    expect(savedCart.items[0].product.size).toBe(
      cartData.items[0].product.size
    );
    expect(savedCart.items[0].product.color).toBe(
      cartData.items[0].product.color
    );
    expect(savedCart.items[0].product.price).toBe(
      cartData.items[0].product.price
    );
    expect(savedCart.items[0].product.unit).toBe(
      cartData.items[0].product.unit
    );
    expect(savedCart.items[0].product.brand).toBe(
      cartData.items[0].product.brand
    );
    expect(savedCart.items[0].unit).toBe(cartData.items[0].unit);
  });
});
