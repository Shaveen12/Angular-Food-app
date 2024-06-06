import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'

import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../http_status";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const foodscount = await UserModel.countDocuments();
        if (foodscount>0) {
            res.send("Seed is already done!");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed is Done!");
    }
))

router.post("/register", asyncHandler(
    async (req, res) => {
        console.log("Inside register")
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if (user) {
            res.status(HTTP_BAD_REQUEST).send(
                'User is already existing, please login!');
                return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser:User = {
            id:'',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
))

router.post("/login",asyncHandler(
    async (req, res) => {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email})
    
        if (user && (await bcrypt.compare(password, user.password))) {
            const userWithToken= generateTokenResponse(user);
            //console.log(userWithToken)
            res.send(userWithToken);
            console.log("in api");
        } else {
            res.status(HTTP_BAD_REQUEST).send("User name or password is not valid!")
        }
    }
))


const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
      id: user.id, email: user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET!, { expiresIn: "30d" });
  
    return { ...user.toObject(), token };
  }
  

export default router;