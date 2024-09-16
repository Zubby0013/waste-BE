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
exports.deleteOneUser = exports.viewOneUser = exports.signinUser = exports.viewAllUser = exports.createUser = void 0;
const flowModel_1 = __importDefault(require("../model/flowModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyName, email, password } = req.body;
        const generateSalt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, generateSalt);
        const user = yield flowModel_1.default.create({ companyName, email, password: hashedPassword });
        return res.status(201).json({
            message: "User created successful",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        });
    }
});
exports.createUser = createUser;
const viewAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield flowModel_1.default.find();
        return res.status(201).json({
            message: "User viewAll successful",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        });
    }
});
exports.viewAllUser = viewAllUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield flowModel_1.default.findOne({ email });
        if (user) {
            const checkPassword = yield bcrypt_1.default.compare(password, user.password);
            if (checkPassword) {
                return res.status(200).json({
                    message: "viewing users",
                    data: user
                });
            }
            else {
                return res.status(404).json({
                    message: "please enter the correct password"
                });
            }
        }
        else {
            return res.status(404).json({
                message: "please go register first"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error logging user"
        });
    }
});
exports.signinUser = signinUser;
const viewOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield flowModel_1.default.findById(userID);
        return res.status(200).json({
            message: "successful find one",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        });
    }
});
exports.viewOneUser = viewOneUser;
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield flowModel_1.default.findByIdAndDelete(userID);
        return res.status(200).json({
            message: "User created successful",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        });
    }
});
exports.deleteOneUser = deleteOneUser;
