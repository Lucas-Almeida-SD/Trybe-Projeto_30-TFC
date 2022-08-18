import { Router } from 'express';
import UserService from '../services/User.service';
import UserController from '../controllers/User.controller';
import UserModel from '../database/models/User.model';

const loginRoute = Router();

const service = new UserService(UserModel);
const controller = new UserController(service);

loginRoute.post('/', controller.login);

export default loginRoute;
