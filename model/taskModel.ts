import { Document,Schema, Types, model } from "mongoose"


interface iTask {
    taskTitle: string;
    deadline: string;
    assignee: {};
    budget: number;
  
    project: {};
  }

interface iTaskData extends iTask, Document{};

const taskModel = new Schema<iTaskData>(
    {
       taskTitle:{
         type: String
       },
       deadline:{
         type: String,
       },
       assignee:{
        type: {}
       },
       budget:{
         type: Number
       },
       project: {
        type: Types.ObjectId,
        ref: "projects",
      },
    },
    {timestamps: true}
);

export default model<iTaskData>("task",taskModel);