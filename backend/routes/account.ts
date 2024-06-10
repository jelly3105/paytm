import express from "express";
import account from "../controllers/account";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get('/balance', authMiddleware, account.getBalance);
router.post('/transfer', authMiddleware, account.transferMoney);

export default router;