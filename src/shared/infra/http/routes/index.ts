import { Router } from "express";
import { goalRoutes } from "./goal.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/goal", goalRoutes);

export { router };
