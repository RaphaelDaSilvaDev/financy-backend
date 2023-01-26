import { CreateGoalController } from "@modules/goals/useCases/createGoal/CreateGoalController";
import { DeleteGoalController } from "@modules/goals/useCases/deleteGoal/DeleteGoalController";
import { ListGoalsController } from "@modules/goals/useCases/listGoals/ListGoalsController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const goalRoutes = Router();

const createGoalController = new CreateGoalController();
const listAllGoalsController = new ListGoalsController();
const deleteGoalController = new DeleteGoalController();

goalRoutes.post("/", ensureAuthenticated, createGoalController.handle);
goalRoutes.get("/", ensureAuthenticated, listAllGoalsController.handle);
goalRoutes.delete("/:id", ensureAuthenticated, deleteGoalController.handle);

export { goalRoutes };
