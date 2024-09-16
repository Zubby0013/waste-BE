import {Request, Response} from "express";
import userModel from "../model/flowModel";
import bcrypt from "bcrypt";

export const createUser = async(req:Request, res:Response)=>{
    try {
        const {companyName, email,password} = req.body;

         const generateSalt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password,generateSalt);

        const user = await userModel.create({companyName, email, password:hashedPassword});

        return res.status(201).json({
            message: "User created successful",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        })
    }
};

export const viewAllUser = async(req:Request, res:Response)=>{
    try {

        const user = await userModel.find();

        return res.status(201).json({
            message: "User viewAll successful",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        })
    }
};

export const signinUser = async(req:Request, res:Response)=>{
    try {
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                return res.status(200).json({
                    message: "viewing users",
                    data: user
                })
            } else {
                return res.status(404).json({
                    message: "please enter the correct password"
                })
            }
        } else {
            return res.status(404).json({
                message: "please go register first"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error logging user"
        })
    }
};

export const viewOneUser = async(req:Request, res:Response)=>{
    try {
        const {userID} = req.params;

        const user = await userModel.findById(userID);

        return res.status(200).json({
            message: "successful find one",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        })
    }
};

export const deleteOneUser = async(req:Request, res:Response)=>{
    try {
        const {userID} = req.params;

        const user = await userModel.findByIdAndDelete(userID);

        return res.status(200).json({
            message: "User created successful",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        })
    }
}