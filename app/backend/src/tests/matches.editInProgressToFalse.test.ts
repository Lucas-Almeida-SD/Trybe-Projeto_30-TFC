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

describe('Testes da rota "PATCH /matches/:id/finish"', () => {
  let chaiHttpResponse: Response;

  describe('Será validado que é possível alterar o status inProgress de uma partida para false no banco de dados', () => {
    before(async () => {
      sinon.stub(MatchRepository, 'update').resolves();

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/2/finish');
    });

    after(() => {
      (MatchRepository.update as sinon.SinonStub).restore();
    });

    it('Deve responder com status code "200"', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Deve responder com a mensagem "Finished" no corpo da resposta', () => {
      const message = { message: 'Finished' };
      expect(chaiHttpResponse.body).to.be.eqls(message);
    });
  })
});