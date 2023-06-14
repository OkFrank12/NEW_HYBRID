import express, { Router } from "express";
import {
  Register,
  getUser,
  loginUser,
  singleUser,
} from "../controller/authController";

const router: Router = express.Router();

router.route("/").get(getUser);
router.route("/register").post(Register);
router.route("/login").post(loginUser);
router.route("/user/:id").get(singleUser);

export default router;
