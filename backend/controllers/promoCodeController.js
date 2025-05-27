import promoCodeModel from "../models/promoCodeModel.js";

const validatePromoCode = async (req, res) => {
  const { code, totalAmount } = req.body;

  try {
    const promo = await promoCodeModel.findOne({ code, isActive: true });

    if (!promo) return res.status(404).json({ message: "Invalid promo code" });

    if (new Date(promo.expiryDate) < new Date())
      return res.status(400).json({ message: "Promo code expired" });

    if (totalAmount < promo.minOrderValue)
      return res.status(400).json({ message: `Minimum order: $${promo.minOrderValue}` });

    let discount = 0;
    if (promo.discountType === "percentage") {
      discount = (totalAmount * promo.discountValue) / 100;
    } else {
      discount = promo.discountValue;
    }

    return res.status(200).json({
      success: true,
      discount: Math.min(discount, totalAmount),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const addPromoCode = async (req, res) => {
  const {
    code,
    discountType,
    discountValue,
    minOrderValue,
    expiryDate,
    isActive = true,
  } = req.body;

  try {
    const existing = await promoCodeModel.findOne({ code });
    if (existing)
      return res.status(400).json({ message: "Promo code already exists" });

    const newPromo = new promoCodeModel({
      code,
      discountType,
      discountValue,
      minOrderValue,
      expiryDate,
      isActive,
    });

    await newPromo.save();
    return res.status(201).json({ success: true, message: "Promo code created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating promo code" });
  }
};


export {validatePromoCode, addPromoCode}