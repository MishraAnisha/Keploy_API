import express from "express";
import { create, deleteUser, fetch, update } from "../controller/usercontroller.js";

const route = express.Router();

route.get("/", fetch);
route.post("/", create);
route.put("/:id", update);
route.delete("/:id", deleteUser);

export default route;
