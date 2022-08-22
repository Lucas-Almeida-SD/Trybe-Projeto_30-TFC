import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import {
  matchesGetAllByProgressEqualFalseResponse,
  leaderboardGetAllByHomeTeamResponse,
} from './mocks/dataMocks';

import MatchRepository from '../database/models/repository/Match.repository';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota "GET /leaderboard/home"', () => {
  let chaiHttpResponse: Response;

  describe('Será validado que é possível filtrar as classificações dos times da casa', () => {

    before(async () => {
      sinon
        .stub(MatchRepository, 'findAll')
        .resolves(matchesGetAllByProgressEqualFalseResponse as Array<MatchRepository>);
      
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    });
    
    after(() => {
      (MatchRepository.findAll as sinon.SinonStub).restore();
    });

    it('Deve responder com status code "200"', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Deve responder com uma lista contendo os placares das partidas finalizadas filtrada pelos times de casa', () => {
      expect(chaiHttpResponse.body).to.be.eqls(leaderboardGetAllByHomeTeamResponse);
    });
  });
});