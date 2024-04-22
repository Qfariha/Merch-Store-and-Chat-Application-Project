import express from "express";
import {
  adminVerifyController,
  login,
  logout,
  signup,
  forgotPasswordController
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgot-password",forgotPasswordController);

router.post("/logout", logout);

router.get("/admin-verify/:username", adminVerifyController);



export default router;
