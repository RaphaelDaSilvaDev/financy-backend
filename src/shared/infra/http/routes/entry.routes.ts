import { CreateEntryController } from "@modules/entries/useCases/createEntry/CreateEntryController";
import { ListEntriesController } from "@modules/entries/useCases/listEntries/ListEntriesController";
import { ListGoalEntriesController } from "@modules/entries/useCases/listGoalEntries/ListGoalEntriesController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const entryRoutes = Router();

const createEntryController = new CreateEntryController();
const listEntriesController = new ListEntriesController();
const listGoalEntriesController = new ListGoalEntriesController();

entryRoutes.post("/", ensureAuthenticated, createEntryController.handle);
entryRoutes.get("/", ensureAuthenticated, listEntriesController.handle);
entryRoutes.get("/:id", ensureAuthenticated, listGoalEntriesController.handle);

export { entryRoutes };
