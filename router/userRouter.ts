import { Router } from "express";
import { createUser, deleteOneUser, signinUser, viewAllUser, viewOneUser } from "../controller/flowController";

const router:Router = Router();

router.route("/createUser").post(createUser);
router.route("/login-User").post(signinUser);
router.route("/view-all-user").get(viewAllUser);
router.route("/view-one-user/:userID").get(viewOneUser);
router.route("/delete-user/:userID").delete(deleteOneUser);

export default router;