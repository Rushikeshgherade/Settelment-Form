import express from "express";
import { addSettelment } from "../controller/settelment.controller.js";

const router = express.Router()

router.post("/addForm", addSettelment)

export default router;  