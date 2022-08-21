import { Router } from 'express';
import MatchModel from '../database/models/Match.model';
import MatchService from '../services/Match.service';
import MatchController from '../controllers/Match.controller';
import authentication from '../middlewares/authentication';
import TeamModel from '../database/models/Team.model';

const service = new MatchService(MatchModel, TeamModel);
const controller = new MatchController(service);

const matchRoute = Router();

matchRoute.get('/', controller.getAll, controller.getAllByInProgress);
matchRoute.post('/', authentication, controller.create);
matchRoute.patch('/:id', controller.editGoalsNumber);
matchRoute.patch('/:id/finish', controller.editInProgressToFalse);

export default matchRoute;
