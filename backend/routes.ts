import express from "express";
import authenticationRoutes from "./controllers/authentication";
import { authMiddleware } from "./middlewares/authMiddleware";

const router = express.Router();

router.post('/signup', authenticationRoutes.signUp);
router.post('/login', authenticationRoutes.logIn);
router.get('/', authMiddleware);

export default router;