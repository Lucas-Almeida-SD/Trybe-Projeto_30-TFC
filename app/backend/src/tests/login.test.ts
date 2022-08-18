import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import { loginUserRepositoryFindOneResponse } from './mocks/dataMocks';
import UserRepository from '../database/models/repository/User.repository';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota "POST /login"', () => {
  let chaiHttpResponse: Response;

  describe('Será validado que é possível realizar login', () => {
    before(async () => {
      sinon
        .stub(UserRepository, 'findOne')
        .resolves({ ...loginUserRepositoryFindOneResponse } as UserRepository);
      
        chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: "lucas@teste.com", password: "mypassword" });
    });

    after(() => {
      (UserRepository.findOne as sinon.SinonStub).restore;
    });

    it('Deve responder com status code "200"', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Deve responder com um token no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.have.property('token');
      expect(chaiHttpResponse.body.token).to.be.a('string');
    });
  });
});
