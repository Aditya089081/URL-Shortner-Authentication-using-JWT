// middleware/auth.js
import { verifyJWTToken } from "../service/auth.js";

export const restrictToLoggedInOnly = (req, res, next) => {
  const token = req.cookies?.uid;
  if (!token) return res.redirect("/login");

  try {
    const decoded = verifyJWTToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.redirect("/login");
  }
};
