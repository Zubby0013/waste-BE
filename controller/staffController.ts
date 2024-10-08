import {Request, Response} from "express";
import userModel from "../model/flowModel";
import staffModel from "../model/staffModel";
import { Types } from "mongoose";

export const createStaff = async(req:Request, res:Response)=>{
    try {
        const {userID} = req.params;
        const {staffName, email, password, avatar} =req.body;

        const user = await userModel.findById(userID);
        if (user) {
            const staff =await staffModel.create({
                staffName,
                email,
                password,
                avatar: staffName.charAt(0),
            });
            user.staff.push(new Types.ObjectId(staff._id));
            user.save();
            return res.status(201).json({
                message: "staff created successful",
                data: staff
            })
        } else {
            return res.status(404).json({
                message: "Error creating staff"
            })
        }   
    } catch (error) {
        return res.status(404).json({
            message: "Error creating staff"
        })
    }
};

export const viewStaff = async(req:Request, res:Response)=>{
    try {
        const {userID} = req.params;

        const user = await userModel.findById(userID).populate({
            path: "staff",
        });
        
            return res.status(200).json({
                message: "view staff users",
                data: user
            })
         
    } catch (error) {
        return res.status(404).json({
            message: "Error creating staff"
        })
    }
};

export const deleteStaff = async(req:Request, res:Response)=>{
    try {
        const {userID, staffID} = req.params;

        const user:any = await userModel.findById(userID);

        if (user) {
            const staff = await staffModel.findByIdAndDelete(staffID);
            user.staff.pull(new Types.ObjectId(staffID));
            user.save()
            return res.status(201).json({
                message: "User viewAll successful",
                data: staff
            })
        } else {
            return res.status(404).json({
                message: "Error matching user",
              });
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        })
    }
};