import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import {
  createMatchWithInProgressEqualTrueRequest,
  createMatchWithInProgressEqualTrueResponse,
  loginUserRequest,
} from './mocks/dataMocks';

import MatchRepository from '../../src/database/models/repository/Match.repository';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota "POST /matches"', () => {
  let chaiHttpResponse: Response;

  describe('Será validado que é possível salvar uma partida com o status de inProgress como true no banco de dados ', () => {

    before(async () => {
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
      (MatchRepository.create as sinon.SinonStub).restore();
    });

    it('Deve responder com status code "201"', () => {
      expect(chaiHttpResponse).to.have.status(201);
    });

    it('Deve responder com um objeto contendo os dados da partida armazenada no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.eqls(createMatchWithInProgressEqualTrueResponse)
    })
  });
});