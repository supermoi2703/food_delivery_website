import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vucuong:Cuong129@cluster0.1rihzbu.mongodb.net/food_delivery_web').then(()=> console.log('DB Connected'));
}