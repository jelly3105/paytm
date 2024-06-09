import express from "express";
import authentication from "../controllers/authentication";
import user from "../controllers/user";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post('/signup', authentication.signUp);
router.post('/login', authentication.logIn);

router.put('/', authMiddleware, user.updateUser);

router.get('/bulk', authMiddleware, user.getUsers);

export default router;