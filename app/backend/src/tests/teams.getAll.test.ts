import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import {
  teamsGetAllResponse,
} from './mocks/dataMocks';

import TeamRepository from '../database/models/repository/Team.repository';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota "GET /teams"', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon
      .stub(TeamRepository, 'findAll')
      .resolves([ ...teamsGetAllResponse ] as Array<TeamRepository>)
  })

  after(() => {
    (TeamRepository.findAll as sinon.SinonStub).restore();
  });

  describe('Será validado que é possível obter todos os times', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams');
    });

    it('Deve responder com status code "200"', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Deve responder com um array contendo todos os times no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.eqls(teamsGetAllResponse)
    })
  });
});