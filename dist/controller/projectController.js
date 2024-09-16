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
exports.deleteProject = exports.viewProject = exports.createProject = void 0;
const flowModel_1 = __importDefault(require("../model/flowModel"));
const staffModel_1 = __importDefault(require("../model/staffModel"));
const mongoose_1 = require("mongoose");
const projectModel_1 = __importDefault(require("../model/projectModel"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { projectName, budget, deadline } = req.body;
        const user = yield flowModel_1.default.findById(userID);
        if (user) {
            const project = yield projectModel_1.default.create({
                projectName,
                budget,
                deadline
            });
            user.project.push(new mongoose_1.Types.ObjectId(project._id));
            user.save();
            return res.status(201).json({
                message: "staff created successful",
                data: project
            });
        }
        else {
            return res.status(404).json({
                message: "Error creating staff"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating staff"
        });
    }
});
exports.createProject = createProject;
const viewProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const project = yield flowModel_1.default.findById(userID).populate({
            path: "project",
        });
        return res.status(201).json({
            message: "view staff users",
            data: project
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating staff"
        });
    }
});
exports.viewProject = viewProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, projectID } = req.params;
        const user = yield flowModel_1.default.findById(userID);
        if (user) {
            const project = yield staffModel_1.default.findByIdAndDelete(projectID);
            user.project.pull(new mongoose_1.Types.ObjectId(projectID));
            user.save();
            return res.status(201).json({
                message: "User viewAll successful",
                data: project
            });
        }
        else {
            return res.status(404).json({
                message: "Error creating user"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        });
    }
});
exports.deleteProject = deleteProject;
