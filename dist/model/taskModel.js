"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const taskModel = new mongoose_1.Schema({
    taskTitle: {
        type: String
    },
    deadline: {
        type: String,
    },
    assignee: {
        type: {}
    },
    budget: {
        type: Number
    },
    project: {
        type: mongoose_1.Types.ObjectId,
        ref: "projects",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("task", taskModel);
