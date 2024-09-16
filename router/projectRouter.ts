import { Router } from "express";
import { createProject, deleteProject, viewProject } from "../controller/projectController";

const router:Router = Router();
router.route("/create-project/:userID").post(createProject);
router.route("/view-user-project/:userID").get(viewProject);

router.route("/delete-project-staff/:userID/:projectID").delete(deleteProject);

export default router;