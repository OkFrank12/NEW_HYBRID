import express, { Router } from "express";
import {
  createTask,
  deleteTask,
  singleTask,
  updateTask,
  viewTask,
} from "../controller/todoController";

const router: Router = express.Router();

router.route("/").get(viewTask);
router.route("/single/:id").get(singleTask);
router.route("/create").post(createTask);
router.route("/delete/:id").delete(deleteTask);
router.route("/update/:id").patch(updateTask);

export default router;
