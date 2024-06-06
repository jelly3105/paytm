import express from "express";
import authenticationRoutes from "./controllers/authentication";

const router = express.Router();

router.post('/signup', authenticationRoutes.signUp);
router.post('/login', authenticationRoutes.logIn);

export default router;