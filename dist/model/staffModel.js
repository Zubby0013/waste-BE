"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const staffModel = new mongoose_1.Schema({
    staffName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("staff", staffModel);
