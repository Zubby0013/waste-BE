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
exports.deleteStaff = exports.viewStaff = exports.createStaff = void 0;
const flowModel_1 = __importDefault(require("../model/flowModel"));
const staffModel_1 = __importDefault(require("../model/staffModel"));
const mongoose_1 = require("mongoose");
const createStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { staffName, email, password, avatar } = req.body;
        const user = yield flowModel_1.default.findById(userID);
        if (user) {
            const staff = yield staffModel_1.default.create({
                staffName,
                email,
                password,
                avatar: staffName.charAt(0),
            });
            user.staff.push(new mongoose_1.Types.ObjectId(staff._id));
            user.save();
            return res.status(201).json({
                message: "staff created successful",
                data: staff
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
exports.createStaff = createStaff;
const viewStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield flowModel_1.default.findById(userID).populate({
            path: "staff",
        });
        return res.status(200).json({
            message: "view staff users",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating staff"
        });
    }
});
exports.viewStaff = viewStaff;
const deleteStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, staffID } = req.params;
        const user = yield flowModel_1.default.findById(userID);
        if (user) {
            const staff = yield staffModel_1.default.findByIdAndDelete(staffID);
            user.staff.pull(new mongoose_1.Types.ObjectId(staffID));
            user.save();
            return res.status(201).json({
                message: "User viewAll successful",
                data: staff
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
            message: "Error creating user"
        });
    }
});
exports.deleteStaff = deleteStaff;
