import express from "express";
import {
  renderHome,
  handleShortner,
  handleRedirect,
  getMe,
} from "../controller/shortnerController.js";
import { restrictToLoggedInOnly } from "../middleware/auth.js";
import { deleteLink, getEdit, postEdit } from "../controller/editController.js";

const router = express.Router();

router.route("/edit/:id").get(getEdit).post(postEdit);
router.route("/delete/:id").post(deleteLink);
router.get("/", renderHome);
router.post("/shorten", restrictToLoggedInOnly, handleShortner);
router.get("/profile", restrictToLoggedInOnly, getMe);
router.get("/:shortId", handleRedirect);

export default router;
