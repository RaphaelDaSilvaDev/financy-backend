import { AuthenticationUserController } from "@modules/users/useCases/authenticationUser/AuthenticationUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { CreateUserAdminController } from "@modules/users/useCases/createUserAdmin/CreateUserAdminController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/deleteUserController";
import { DeleteUserAdminController } from "@modules/users/useCases/deleteUserAdmin/DeleteUserAdminController";
import { ListUserController } from "@modules/users/useCases/listUser/ListUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { UpdateUserAdminController } from "@modules/users/useCases/updateUserAmin/UpdateUserAdminController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";
import multer from "multer";
import uploadConfig from "@config/upload";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const authenticationUserController = new AuthenticationUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const listUserController = new ListUserController();
const createUserAdmin = new CreateUserAdminController();
const updateUserAdmin = new UpdateUserAdminController();
const deleteUserAdmin = new DeleteUserAdminController();

userRoutes.post("/", createUserController.handle);

userRoutes.post("/session", authenticationUserController.handle);

userRoutes.patch(
  "/update",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserController.handle
);

userRoutes.delete("/delete", ensureAuthenticated, deleteUserController.handle);

userRoutes.get("/", ensureAuthenticated, ensureIsAdmin, listUserController.handle);

userRoutes.post("/admin", ensureAuthenticated, ensureIsAdmin, createUserAdmin.handle);

userRoutes.post("/admin/update/:id", ensureAuthenticated, ensureIsAdmin, updateUserAdmin.handle);

userRoutes.delete("/admin/delete/:id", ensureAuthenticated, ensureIsAdmin, deleteUserAdmin.handle);

export { userRoutes };
