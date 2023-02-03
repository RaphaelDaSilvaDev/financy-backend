import { CreateEntryController } from "@modules/entries/useCases/createEntry/CreateEntryController";
import { DeleteEntryController } from "@modules/entries/useCases/deleteEntry/DeleteEntryController";
import { DeleteEntryGoalController } from "@modules/entries/useCases/deleteEntryGoal/DeleteEntryGoalController";
import { ListEntriesController } from "@modules/entries/useCases/listEntries/ListEntriesController";
import { ListGoalEntriesController } from "@modules/entries/useCases/listGoalEntries/ListGoalEntriesController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const entryRoutes = Router();

const createEntryController = new CreateEntryController();
const listEntriesController = new ListEntriesController();
const listGoalEntriesController = new ListGoalEntriesController();
const deleteEntryController = new DeleteEntryController();
const deleteEntryGoalController = new DeleteEntryGoalController();

entryRoutes.post("/", ensureAuthenticated, createEntryController.handle);
entryRoutes.get("/", ensureAuthenticated, listEntriesController.handle);
entryRoutes.get("/:id", ensureAuthenticated, listGoalEntriesController.handle);
entryRoutes.delete("/:id", ensureAuthenticated, deleteEntryController.handle);
entryRoutes.delete("/goal/:id", ensureAuthenticated, deleteEntryGoalController.handle);

export { entryRoutes };
