"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const userRouter_1 = __importDefault(require("./router/userRouter"));
const staffRouter_1 = __importDefault(require("./router/staffRouter"));
const projectRouter_1 = __importDefault(require("./router/projectRouter"));
const taskRouter_1 = __importDefault(require("./router/taskRouter"));
const mainApp = (app) => {
    app.use("/api/v1", userRouter_1.default);
    app.use("/api/v1", staffRouter_1.default);
    app.use("/api/v1", projectRouter_1.default);
    app.use("/api/v1", taskRouter_1.default);
    try {
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "let's do this!!!",
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "Error recorded",
                });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.mainApp = mainApp;
