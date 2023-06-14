import { Request, Response } from "express";
import moment from "moment";
import crypto from "crypto";
import { iTask } from "../utils/interface";

let db: iTask[] = [];

export const createTask = (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const date = Date.now();

    const ID: string = crypto.randomUUID();
    const newTask = {
      id: ID,
      title,
      date: moment(date).format("LLLL"),
      time: moment(date).fromNow(),
      complete: false,
    };

    db.push(newTask);

    res.status(201).json({
      message: "Task created",
      data: newTask,
    });
  } catch (error) {
    res.status(404).json({
      message: "Task cannot be created",
    });
  }
};

export const singleTask = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = db.filter((el: iTask) => {
      return el?.id === id;
    });

    res.status(200).json({
      message: "view single task",
      data: task,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Task cannot be viewed",
    });
  }
};

export const deleteTask = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    db = db.filter((el: iTask) => {
      return el?.id !== id;
    });

    return res.status(201).json({
      message: "Task deleted successfully",
      data: db,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Task cannot be deleted",
    });
  }
};

export const updateTask = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = db.filter((el: iTask) => {
      return el?.id === id ? (el.complete = true) : null;
    });

    return res.status(201).json({
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to update task",
    });
  }
};

export const viewTask = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "view task",
      data: db,
    });
  } catch (error) {
    return res.status(404).json({
      message: "can't view task",
    });
  }
};
