"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controller/projectController");
const router = (0, express_1.Router)();
router.route("/create-project/:userID").post(projectController_1.createProject);
router.route("/view-user-project/:userID").get(projectController_1.viewProject);
router.route("/delete-project-staff/:userID/:projectID").delete(projectController_1.deleteProject);
exports.default = router;
