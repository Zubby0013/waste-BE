import {Document, Schema, Types, model } from "mongoose"


interface iUser{
    staffName: string
    email: string
    password: string
    avatar: string
    user: {}
}

interface iUserData extends iUser, Document{};

const staffModel = new Schema<iUserData>(
    {
       staffName:{
         type: String
       },
       email:{
         type: String,
         unique: true
       },
       password:{
         type: String
       },
       user: {
        type: Types.ObjectId,
        ref: "users"
       }
    },
    {timestamps: true}
);

export default model<iUserData>("staff",staffModel);