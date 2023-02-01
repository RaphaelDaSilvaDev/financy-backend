import { Router } from "express";
import { entryRoutes } from "./entry.routes";
import { goalRoutes } from "./goal.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/goal", goalRoutes);
router.use("/entry", entryRoutes);

export { router };
