// controller/userController.js
import argon2 from "argon2";
import { generateToken } from "../service/auth.js";
import { getUserByEmail, createUser } from "../model/user.js";
import { LoginUserSchema, registerUserSchema } from "../Validate/authValidate.js";

export const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  // HiYA ZOD VALIDATION KARAT AAHI
  const {data,error} = registerUserSchema.safeParse(req.body);
  console.log(data);
  if(error){
    const errors = error.issues&&error.issues.length>0?error.issues[0].message:"Invalid Input";
    req.flash("errors",errors);
    return res.redirect("/register");
  }
  try {
    const existing = await getUserByEmail(email);
    if (existing) {
      req.flash("errors", "User already exists");
      return res.redirect("/register");
    }

    const hashedPassword = await argon2.hash(password);
    const insertId = await createUser({ name, email, password: hashedPassword });

    if (!insertId) {
      req.flash("errors", "Failed to register user");
      return res.redirect("/register");
    }

    res.redirect("/login");
  } catch (err) {
    console.error("Signup error:", err);
    req.flash("errors", "Server error");
    res.redirect("/register");
  }
};


export const handleUserLogin = async (req, res) => {
  
  // Yaha zod validattion karat ahee , SafeParse kai Use Kai Ke
  const {data,error} = LoginUserSchema.safeParse(req.body);
  console.log("data:",data);
  const { email, password } = req.body;
  if(error){
    const errors = error.issues&&error.issues.length>0?error.issues[0].message:"Invalid Input";
    req.flash("errors",errors);
    res.redirect("/login");
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      req.flash("errors", "Invalid credentials");
      return res.redirect("/login");
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      req.flash("errors", "Invalid credentials");
      return res.redirect("/login");
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    res.cookie("uid", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    console.error("Login error:", err);
    req.flash("errors", "Server error");
    res.redirect("/login");
  }
};
