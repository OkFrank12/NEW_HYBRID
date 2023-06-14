import { Request, Response } from "express";
import crypto from "crypto";
import { iUser } from "../utils/interface";

let data: iUser[] = [];

export const getUser = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "view users",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Not Found",
      data: error.message,
    });
  }
};

export const Register = (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const ID: string = crypto.randomUUID();
    const newUser = { id: ID, name, email, password };
    data.push(newUser);

    return res.status(201).json({
      message: "created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Not Found",
      data: error,
    });
  }
};

export const singleUser = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const singleUser = data.filter((el: iUser) => {
      return el?.id === id;
    });

    return res.status(200).json({
      message: "view single user",
      data: singleUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "Not Found",
      data: error,
    });
  }
};

export const loginUser = (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    data.filter((el: iUser) => {
      if (el.email === email) {
        return res.status(201).json({
          message: "login user",
          data: el,
        });
      } else {
        return res.status(404).json({
          message: "user not found",
        });
      }
    });
    return res.status(200).json({
      message: "LOGIN",
    });
  } catch (error) {
    res.status(404).json({
      message: "Not Found",
      data: error,
    });
  }
};
