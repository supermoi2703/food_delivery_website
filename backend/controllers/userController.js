import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    // return role and token
    res.json({
      success: true,
      token,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


//register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        // checking is user already exists
        const exists = await userModel.findOne ({email});
        if(exists){
            return res.json({success : false, message: "User already exists"})
        }
        //validating email format $ strong password
        if(!validator.isEmail (email)){
            return res.json({success : false, message: "Plese enter a valid email"})
        }

        if (password.length <8 ){
            return res.json ({success : false, message: "Plese enter a strong password"})
        }

        //hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name : name,
            email: email, 
            password : hashedPassword, 

        })


        const user =  await newUser.save()
        const token = createToken (user._id)
        res.json({success: true, token})


    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }
}

// get all users
const listUser = async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0 }); 
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to fetch users." });
  }
};

const removeUser = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await userModel.findByIdAndDelete(id);
    if (result) {
      res.json({ success: true, message: "User removed successfully." });
    } else {
      res.json({ success: false, message: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing user." });
  }
};

export {loginUser, registerUser, listUser, removeUser}