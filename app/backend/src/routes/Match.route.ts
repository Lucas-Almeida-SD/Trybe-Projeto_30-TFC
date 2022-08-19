import { Router } from 'express';
import MatchModel from '../database/models/Match.model';
import MatchService from '../services/Match.service';
import MatchController from '../controllers/Match.controller';

const service = new MatchService(MatchModel);
const controller = new MatchController(service);

const matchRoute = Router();

matchRoute.get('/', controller.getAll);

export default matchRoute;
