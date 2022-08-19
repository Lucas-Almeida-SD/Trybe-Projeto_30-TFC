import { Router } from 'express';
import TeamController from '../controllers/Team.controller';
import TeamModel from '../database/models/Team.model';
import TeamService from '../services/Team.service';

const teamRoute = Router();

const service = new TeamService(TeamModel);
const constroller = new TeamController(service);

teamRoute.get('/', constroller.getAll);

export default teamRoute;
