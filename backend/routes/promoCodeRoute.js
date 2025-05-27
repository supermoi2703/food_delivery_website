import express from "express";
import { validatePromoCode, addPromoCode } from "../controllers/promoCodeController.js";

const promoCodeRouter = express.Router();

promoCodeRouter.post("/validate", validatePromoCode);
promoCodeRouter.post("/add", addPromoCode);

export default promoCodeRouter;