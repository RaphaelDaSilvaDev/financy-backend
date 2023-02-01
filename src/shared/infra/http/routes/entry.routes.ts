import { CreateEntryController } from "@modules/entries/useCases/createEntry/CreateEntryController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const entryRoutes = Router();

const createEntryController = new CreateEntryController();

entryRoutes.post("/", ensureAuthenticated, createEntryController.handle);

export { entryRoutes };
