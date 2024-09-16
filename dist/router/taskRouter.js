"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controller/taskController");
const router = (0, express_1.Router)();
router.route("/create-task/:projectID").post(taskController_1.createTask);
router.route("/view-user-task/:projectID").get(taskController_1.viewProjectTask);
router
    .route("/delete-task-project/:projectID/:taskID")
    .delete(taskController_1.deleteProjectTask);
exports.default = router;
