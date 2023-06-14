import { Request, Response } from "express";
import axios from "axios";

const url: string = `http://localhost:2111`;

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await axios.get(`${url}/api/auth`)
    console.log(user);

    return res.status(200).json({
      message: "Users successfully retrived",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Users retrieval unsuccessfully",
    });
  }
};
