import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs";


//add food items
const addFood = async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });
    try {
        await food.save();
        res.json({ success: true, message: "Food Item Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to add food item" });
        
    }
}

//all food list
const listFood = async (req, res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data: foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Failed to fetch food items"})
    }

}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message: "Food Item Removed Successfully"});
    } catch (error) {
        res.json({success:false, message: "Failed to remove food item"});
    }

}


const searchFood = async (req, res) => {
  const query = req.query.q;

  try {
    const results = await foodModel.find({
      name: { $regex: query, $options: "i" }, // "i" = không phân biệt hoa thường
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed", details: err.message });
  }
};

export { addFood , listFood, removeFood, searchFood};