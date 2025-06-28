// test/userRoutes.test.js
import mongoose from "mongoose";
import { expect } from "chai";
import request from "supertest";
import app from "../index.js";
import User from "../models/userModels.js";
import dotenv from "dotenv";

dotenv.config();

describe("User Routes Integration Tests", () => {
  before(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    await mongoose.connect(process.env.MONGO_URL_TEST);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

  it("POST /api/user/create - should create a new user", async () => {
    const res = await request(app).post("/api/user/create").send({
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main Street",
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
    expect(res.body.name).to.equal("John Doe");
  });

  it("POST /api/user/create - should not allow duplicate email", async () => {
    await User.create({
      name: "Jane",
      email: "jane@example.com",
      address: "456 Lane",
    });

    const res = await request(app).post("/api/user/create").send({
      name: "Jane",
      email: "jane@example.com",
      address: "456 Lane",
    });

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("User already exists.");
  });

  it("GET /api/user/getallusers - should fetch all users", async () => {
    await User.create({
      name: "Bob",
      email: "bob@example.com",
      address: "789 Road",
    });

    const res = await request(app).get("/api/user/getallusers");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
    expect(res.body[0].email).to.equal("bob@example.com");
  });

  it("GET /api/user/getallusers - should return 404 when no users found", async () => {
    const res = await request(app).get("/api/user/getallusers");
    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal("User not Found.");
  });

  it("PUT /api/user/update/:id - should update a user", async () => {
    const user = await User.create({
      name: "Old Name",
      email: "old@example.com",
      address: "Old Address",
    });

    const res = await request(app)
      .put(`/api/user/update/${user._id}`)
      .send({
        name: "New Name",
        address: "New Address",
      });

    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal("New Name");
    expect(res.body.address).to.equal("New Address");
  });

  it("PUT /api/user/update/:id - should return 404 when updating non-existent user", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/user/update/${fakeId}`)
      .send({
        name: "No One",
      });

    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal("User not found.");
  });

  it("DELETE /api/user/delete/:id - should delete a user", async () => {
    const user = await User.create({
      name: "Delete Me",
      email: "delete@example.com",
      address: "Trash Bin",
    });

    const res = await request(app).delete(`/api/user/delete/${user._id}`);
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal("User deleted successfully.");
  });

  it("DELETE /api/user/delete/:id - should return 404 when deleting non-existent user", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/user/delete/${fakeId}`);
    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal("User not found.");
  });
});
