import {Request, Response} from "express";
import userModel from "../model/flowModel";
import staffModel from "../model/staffModel";
import { Types } from "mongoose";
import projectModel from "../model/projectModel";

export const createProject = async(req:Request, res:Response)=>{
    try {
        const {userID} = req.params;
        const {projectName, budget, deadline} =req.body;

        const user = await userModel.findById(userID);
        if (user) {
            const project =await projectModel.create({
                projectName,
                budget,
                deadline
            });
            user.project.push(new Types.ObjectId(project._id));
            user.save();
            return res.status(201).json({
                message: "staff created successful",
                data: project
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

export const viewProject = async(req:Request, res:Response)=>{
    try {
        const {userID} = req.params;

        const project = await userModel.findById(userID).populate({
            path: "project",
        });
        
            return res.status(201).json({
                message: "view staff users",
                data: project
            })
         
    } catch (error) {
        return res.status(404).json({
            message: "Error creating staff"
        })
    }
};

export const deleteProject = async(req:Request, res:Response)=>{
    try {
        const {userID, projectID} = req.params;

        const user:any = await userModel.findById(userID);

        if (user) {
            const project = await staffModel.findByIdAndDelete(projectID);
            user.project.pull(new Types.ObjectId(projectID));
            user.save()
            return res.status(201).json({
                message: "User viewAll successful",
                data: project
            })
        } else {
            return res.status(404).json({
                message: "Error creating user"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        })
    }
};