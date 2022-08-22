import { Router } from 'express';
import LeaderboardModel from '../database/models/Leaderboard.model';
import LeaderboardService from '../services/Leaderboard.service';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardRoute = Router();

const service = new LeaderboardService(LeaderboardModel);
const controller = new LeaderboardController(service);

leaderboardRoute.get('/home', controller.getAllByHomeTeam);
leaderboardRoute.get('/away', controller.getAllByAwayTeam);

export default leaderboardRoute;
