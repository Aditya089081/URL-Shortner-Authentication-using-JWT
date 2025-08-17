import express from "express";
import { handleUserLogin, handleUserSignUp } from "../controller/user.js";


const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register", { errors: req.flash("errors") });
});

router.get("/login", (req, res) => {
  res.render("login", { errors: req.flash("errors") });
});

router.post("/register", handleUserSignUp);
router.post("/login", handleUserLogin);

export default router;
