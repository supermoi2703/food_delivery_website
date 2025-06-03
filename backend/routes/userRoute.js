import express from "express"
import {loginUser, registerUser, listUser, removeUser} from "../controllers/userController.js"


const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/listusers", listUser)
userRouter.post("/removeuser", removeUser)

export default userRouter;