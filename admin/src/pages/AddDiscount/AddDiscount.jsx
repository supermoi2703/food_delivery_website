import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddDiscount.css"; // dùng file CSS giống Add.css

const AddDiscount = ({ url }) => {
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderValue: "",
    expiryDate: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/promocode/add`, form);
      if (response.data.success) {
        toast.success("Promo code created successfully");
        setForm({
          code: "",
          discountType: "percentage",
          discountValue: "",
          minOrderValue: "",
          expiryDate: "",
          isActive: true,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <h2>Add Promo Code</h2>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Promo code"
          required
        />

        <select
          name="discountType"
          value={form.discountType}
          onChange={handleChange}
          required
        >
          <option value="percentage">Percentage (%)</option>
          <option value="fixed">Fixed Amount ($)</option>
        </select>

        <input
          type="number"
          name="discountValue"
          value={form.discountValue}
          onChange={handleChange}
          placeholder="Discount value"
          required
        />

        <input
          type="number"
          name="minOrderValue"
          value={form.minOrderValue}
          onChange={handleChange}
          placeholder="Minimum order value"
        />

        <p>Expiration date</p>
        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          required
        />

        <div className="checkbox-field">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          <label>Active</label>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddDiscount;
