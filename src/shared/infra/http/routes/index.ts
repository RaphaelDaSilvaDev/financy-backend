import express from "express";
import { entryRoutes } from "./entry.routes";
import { goalRoutes } from "./goal.routes";
import { userRoutes } from "./user.routes";

const router = express.Router();

router.use(express.static("tmp"));
router.use("/images", express.static("tmp"));

router.use("/user", userRoutes);
router.use("/goal", goalRoutes);
router.use("/entry", entryRoutes);

export { router };
