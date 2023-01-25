import { CreateGoalController } from "@modules/goals/useCases/createGoal/CreateGoalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const goalRoutes = Router();

const createGoalController = new CreateGoalController();

goalRoutes.post("/", ensureAuthenticated, createGoalController.handle);

export { goalRoutes };
