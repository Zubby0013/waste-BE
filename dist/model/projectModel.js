"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const projectModel = new mongoose_1.Schema({
    projectName: {
        type: String
    },
    deadline: {
        type: String,
    },
    budget: {
        type: Number
    },
    budgetGivenOut: {
        type: Number
    },
    budgetLeft: {
        type: Number
    },
    task: [{
            type: mongoose_1.Types.ObjectId,
            ref: "tasks"
        }],
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("projects", projectModel);
