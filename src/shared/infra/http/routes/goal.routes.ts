import { AvailablePercentageGoalController } from "@modules/goals/useCases/availablePercentageGoal/AvailablePercentageController";
import { CreateGoalController } from "@modules/goals/useCases/createGoal/CreateGoalController";
import { DeleteGoalController } from "@modules/goals/useCases/deleteGoal/DeleteGoalController";
import { GeneralReportController } from "@modules/goals/useCases/generalReport/GeneralReportController";
import { GetGoalController } from "@modules/goals/useCases/getGoal/GetGoalController";
import { ListGoalsController } from "@modules/goals/useCases/listGoals/ListGoalsController";
import { UpdateGoalController } from "@modules/goals/useCases/updateGoal/UpdateGoalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const goalRoutes = Router();

const createGoalController = new CreateGoalController();
const updateGoalController = new UpdateGoalController();
const listAllGoalsController = new ListGoalsController();
const deleteGoalController = new DeleteGoalController();
const availablePercentage = new AvailablePercentageGoalController();
const generalReport = new GeneralReportController();
const getGoal = new GetGoalController();

goalRoutes.post("/", ensureAuthenticated, createGoalController.handle);
goalRoutes.patch("/:id", ensureAuthenticated, updateGoalController.handle);
goalRoutes.get("/", ensureAuthenticated, listAllGoalsController.handle);
goalRoutes.delete("/:id", ensureAuthenticated, deleteGoalController.handle);
goalRoutes.get("/available-percentage", ensureAuthenticated, availablePercentage.handle);
goalRoutes.get("/general-report", ensureAuthenticated, generalReport.handle);
goalRoutes.get("/:id", ensureAuthenticated, getGoal.handle);

export { goalRoutes };
