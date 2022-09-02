import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import {
  loginUserRequest,
  createMatchWithInProgressEqualTrueRequest,
  createMatchWithInProgressEqualTrueResponse,
  createMatchWithEqualTeamsRequest,
  loginUserRepositoryFindOneResponse,
  teamsGetAllResponse,
} from './mocks/dataMocks';

import MatchRepository from '../../src/database/models/repository/Match.repository';
import UserRepository from '../database/models/repository/User.repository';
import TeamRepository from '../database/models/repository/Team.repository';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota "POST /matches"', () => {
  let chaiHttpResponse: Response;
  let message: { message: string };

  describe('Será validado que é possível salvar uma partida com o status de inProgress como true no banco de dados ', () => {

    before(async () => {
      sinon
        .stub(UserRepository, 'findOne')
        .resolves(loginUserRepositoryFindOneResponse as UserRepository);

      sinon
        .stub(TeamRepository, 'findAll').resolves(teamsGetAllResponse as Array<TeamRepository>);
  
      sinon
        .stub(MatchRepository, 'create')
        .resolves(createMatchWithInProgressEqualTrueResponse as MatchRepository);
    
      let loginResponse = await chai
      .request(app)
      .post('/login')
      .send(loginUserRequest);
      
      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: loginResponse.body.token })
      .send(createMatchWithInProgressEqualTrueRequest);
    });
  
    after(() => {
      (UserRepository.findOne as sinon.SinonStub).restore();
      (TeamRepository.findAll as sinon.SinonStub).restore();
      (MatchRepository.create as sinon.SinonStub).restore();
    });

    it('Deve responder com status code "201"', () => {
      expect(chaiHttpResponse).to.have.status(201);
    });

    it('Deve responder com um objeto contendo os dados da partida armazenada no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.eqls(createMatchWithInProgressEqualTrueResponse)
    });
  });

  describe('Será validado que não é possível salvar uma partida com times iguais', () => {

    before(async () => {
      sinon
        .stub(UserRepository, 'findOne')
        .resolves(loginUserRepositoryFindOneResponse as UserRepository);
    
      let loginResponse = await chai
      .request(app)
      .post('/login')
      .send(loginUserRequest);
      
      chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: loginResponse.body.token })
      .send(createMatchWithEqualTeamsRequest);
    });

    after(() => {
      (UserRepository.findOne as sinon.SinonStub).restore();
    });

    it('Deve responder com status code "401"', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('Deve responder com a mensagem "It is not possible to create a match with two equal teams" no corpo da resposta', () => {
      message = { message: 'It is not possible to create a match with two equal teams' };

      expect(chaiHttpResponse.body).to.be.eqls(message)
    });
  });
});