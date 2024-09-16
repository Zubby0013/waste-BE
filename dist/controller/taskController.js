"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewProjectTask = exports.deleteProjectTask = exports.createTask = void 0;
const staffModel_1 = __importDefault(require("../model/staffModel"));
const mongoose_1 = require("mongoose");
const projectModel_1 = __importDefault(require("../model/projectModel"));
const taskModel_1 = __importDefault(require("../model/taskModel"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const { taskTitle, budget, deadline, email } = req.body;
        const staff = yield staffModel_1.default.findOne({ email });
        const project = yield projectModel_1.default.findById(projectID);
        if ((project === null || project === void 0 ? void 0 : project.budgetLeft) < budget) {
            return res.status(404).json({ msg: "Budget left is not enough" });
        }
        else {
            if (project && staff) {
                const task = yield taskModel_1.default.create({
                    taskTitle,
                    budget,
                    deadline,
                    assignee: staff,
                });
                project.task.push(new mongoose_1.Types.ObjectId(task._id));
                project.save();
                yield projectModel_1.default.findByIdAndUpdate(projectID, {
                    budgetGivenOut: project.budgetGivenOut + budget,
                    budgetLeft: project.budgetLeft - budget,
                }, { new: true });
                return res.status(201).json({
                    message: "creating project",
                    data: task,
                });
            }
            else {
                return res.status(404).json({
                    message: "Error matching project",
                });
            }
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
            data: error.message,
        });
    }
});
exports.createTask = createTask;
const deleteProjectTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskID, projectID } = req.params;
        const project = yield projectModel_1.default.findById(projectID);
        if (project) {
            const task = yield taskModel_1.default.findByIdAndDelete(projectID);
            project.project.pull(new mongoose_1.Types.ObjectId(taskID));
            project.save();
            return res.status(201).json({
                message: "creating project",
                data: project,
            });
        }
        else {
            return res.status(404).json({
                message: "Error matching user",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.deleteProjectTask = deleteProjectTask;
const viewProjectTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const project = yield projectModel_1.default.findById(projectID).populate({
            path: "task",
        });
        return res.status(200).json({
            message: "viewing project",
            data: project,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error viewing project",
        });
    }
});
exports.viewProjectTask = viewProjectTask;
