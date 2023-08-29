import express from 'express';
import {USER_ROUTES} from "../../../shared/utils/app-constants.js";
import userController from '../controllers/user-controller.js';
const userRoutes = express.Router();

userRoutes.post(USER_ROUTES.ADD_USER, userController.addUser);
userRoutes.get(USER_ROUTES.GET_USER,userController.getUser);
userRoutes.patch(USER_ROUTES.UPDATE_PWD,userController.updatePwd);
userRoutes.delete(USER_ROUTES.DELETE_USER,userController.deleteUser);
export default userRoutes;