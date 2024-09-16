"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staffController_1 = require("../controller/staffController");
const router = (0, express_1.Router)();
router.route("/create-staff/:userID").post(staffController_1.createStaff);
router.route("/view-user-staff/:userID").get(staffController_1.viewStaff);
router.route("/delete-user-staff/:userID/:staffID").delete(staffController_1.deleteStaff);
exports.default = router;
