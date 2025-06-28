import sinon from "sinon";
import httpMocks from "node-mocks-http";
import { expect } from "chai";

import * as userController from "../controllers/userController.js";
import User from "../models/userModels.js";

describe("Unit Tests - userController", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("create()", () => {
    it("should create a user and return 200", async () => {
      const req = httpMocks.createRequest({
        body: { name: "Test User", email: "test@example.com" }
      });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").resolves(null);
      sinon.stub(User.prototype, "save").resolves({ _id: "123", email: "test@example.com" });

      await userController.create(req, res);

      expect(res.statusCode).to.equal(200);
      const data = res._getJSONData();
      expect(data).to.have.property("email", "test@example.com");
    });

    it("should return 400 if user already exists", async () => {
      const req = httpMocks.createRequest({
        body: { email: "exists@example.com" }
      });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").resolves({ email: "exists@example.com" });

      await userController.create(req, res);

      expect(res.statusCode).to.equal(400);
      const data = res._getJSONData();
      expect(data).to.have.property("message", "User already exists.");
    });

    it("should return 500 on error", async () => {
      const req = httpMocks.createRequest({ body: {} });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").throws(new Error("DB error"));

      await userController.create(req, res);

      expect(res.statusCode).to.equal(500);
      const data = res._getJSONData();
      expect(data).to.have.property("error", "Internal Server Error.");
    });
  });

  describe("fetch()", () => {
    it("should return users with status 200", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      sinon.stub(User, "find").resolves([{ email: "a@example.com" }]);

      await userController.fetch(req, res);

      expect(res.statusCode).to.equal(200);
      const data = res._getJSONData();
      expect(data).to.be.an("array");
      expect(data[0]).to.have.property("email");
    });

    it("should return 404 if no users found", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      sinon.stub(User, "find").resolves([]);

      await userController.fetch(req, res);

      expect(res.statusCode).to.equal(404);
      const data = res._getJSONData();
      expect(data).to.have.property("message", "User not Found.");
    });

    it("should return 500 on error", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      sinon.stub(User, "find").throws(new Error("DB error"));

      await userController.fetch(req, res);

      expect(res.statusCode).to.equal(500);
      const data = res._getJSONData();
      expect(data).to.have.property("error", "Internal Server Error.");
    });
  });

  describe("update()", () => {
    it("should update user and return 201", async () => {
      const req = httpMocks.createRequest({
        params: { id: "123" },
        body: { name: "Updated" }
      });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").resolves({ _id: "123" });
      sinon.stub(User, "findByIdAndUpdate").resolves({ _id: "123", name: "Updated" });

      await userController.update(req, res);

      expect(res.statusCode).to.equal(201);
      const data = res._getJSONData();
      expect(data).to.have.property("name", "Updated");
    });

    it("should return 404 if user not found", async () => {
      const req = httpMocks.createRequest({ params: { id: "123" } });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").resolves(null);

      await userController.update(req, res);

      expect(res.statusCode).to.equal(404);
      const data = res._getJSONData();
      expect(data).to.have.property("message", "User not found.");
    });

    it("should return 500 on error", async () => {
      const req = httpMocks.createRequest({ params: { id: "123" }, body: {} });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").throws(new Error("DB error"));

      await userController.update(req, res);

      expect(res.statusCode).to.equal(500);
      const data = res._getJSONData();
      expect(data).to.have.property("error", "Internal Server Error.");
    });
  });

  describe("deleteUser()", () => {
    it("should delete user and return 201", async () => {
      const req = httpMocks.createRequest({ params: { id: "123" } });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").resolves({ _id: "123" });
      sinon.stub(User, "findByIdAndDelete").resolves();

      await userController.deleteUser(req, res);

      expect(res.statusCode).to.equal(201);
      const data = res._getJSONData();
      expect(data).to.have.property("message", "User deleted successfully.");
    });

    it("should return 404 if user not found", async () => {
      const req = httpMocks.createRequest({ params: { id: "123" } });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").resolves(null);

      await userController.deleteUser(req, res);

      expect(res.statusCode).to.equal(404);
      const data = res._getJSONData();
      expect(data).to.have.property("message", "User not found.");
    });

    it("should return 500 on error", async () => {
      const req = httpMocks.createRequest({ params: { id: "123" } });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").throws(new Error("DB error"));

      await userController.deleteUser(req, res);

      expect(res.statusCode).to.equal(500);
      const data = res._getJSONData();
      expect(data).to.have.property("error", "Internal Server Error.");
    });
  });
});
