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

describe('Testes da rota "GET /teams/:id"', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(TeamRepository, 'findByPk').resolves({ ...teamsGetAllResponse[0] } as TeamRepository);
  });

  after(() => {
    (TeamRepository.findByPk as sinon.SinonStub).restore();
  });

  describe('Será validado que é possível obter o time pelo seu id', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1');
    });

    it('Deve responder com status code "200"', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Deve retornar no corpo da resposta o time correnpondente ao id informado', () => {
      expect(chaiHttpResponse.body).to.be.eqls(teamsGetAllResponse[0])
    })
  });
});