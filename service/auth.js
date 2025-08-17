// service/auth.js
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = ({ id, name, email }) => {
  return jwt.sign({ id, name, email }, env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const verifyJWTToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};
