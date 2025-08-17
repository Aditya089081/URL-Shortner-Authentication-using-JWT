import express from "express";
import { restrictToLoggedInOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/logout", restrictToLoggedInOnly, (req, res) => {
  res.clearCookie("uid");
  res.redirect("/");
});

export default router;
