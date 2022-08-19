import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import {
  matchesGetAllResponse,
} from './mocks/dataMocks';

import MatchRepository from '../../src/database/models/repository/Match.repository';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota "GET /matches"', () => {
  let chaiHttpResponse: Response;

  describe('Quando a rota não possuir a query string "inProgress"', () => {
    before(() => {
      sinon
        .stub(MatchRepository, 'findAll')
        .resolves([ ...matchesGetAllResponse ] as Array<MatchRepository>);
    })
  
    after(() => {
      (MatchRepository.findAll as sinon.SinonStub).restore();
    });
  
    describe('Será validado que é possível obter uma lista de partidas', () => {
      before(async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches');
      });
  
      it('Deve responder com status code "200"', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });
  
      it('Deve responder com um array contendo todas as partidas no corpo da resposta', () => {
        expect(chaiHttpResponse.body).to.be.eqls(matchesGetAllResponse)
      })
    });
  });

  describe('Quando a rota possuir a query string "inProgress"', () => {
    before(() => {
      sinon
        .stub(MatchRepository, 'findAll')
        .resolves([] as Array<MatchRepository>);
    });
  
    after(() => {
      (MatchRepository.findAll as sinon.SinonStub).restore();
    });
  
    describe('Será validado que é possível obter uma lista de partidas em andamento', () => {
      before(async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=true');
      });
  
      it('Deve responder com status code "200"', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });
  
      it('Deve responder com um array contendo todas as partidas em andamento no corpo da resposta', () => {
        expect(chaiHttpResponse.body).to.be.eqls([]);
      })
    });
  });
});