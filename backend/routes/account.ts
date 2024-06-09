import express from "express";
import authentication from "../controllers/authentication";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

export default router;