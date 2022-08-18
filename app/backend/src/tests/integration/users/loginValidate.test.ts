import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../../app';

import { Response } from 'superagent';

import UserRepository from '../../../database/models/repository/User.repository';

chai.use(chaiHttp);

const { expect } = chai;

import {
  loginUserRequest,
  loginUserRepositoryFindOneResponse,
  loginValidateResponse,
} from '../../mocks/dataMocks';

describe.only('Testes da rota "GET /login/validate"', () => {
  let chaiHttpResponse: Response;
  let errorMessage: { message: string };

  describe('Será validado que é possível obter dados do user quando conter um token válido', () => {
    before(async () => {
      sinon
        .stub(UserRepository, 'findOne')
        .resolves({ ...loginUserRepositoryFindOneResponse } as UserRepository);
      
      let loginResponse = await chai
        .request(app)
        .post('/login')
        .send(loginUserRequest);

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: loginResponse.body.token });
    });

    after(() => {
      (UserRepository.findOne as sinon.SinonStub).restore();
    });

    it('Deve responder com status code "200"', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Deve responder com a propriedade "role" do user no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.eqls(loginValidateResponse);
    });
  });

  describe('Será validado que não é possível obter dados do user sem informar o token', () => {
    before(async () => {  
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
    });

    it('Deve responder com status code "401"', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('Deve responder com a mensagem de erro "Token not found" no corpo da resposta', () => {
      errorMessage = { message: 'Token not found' };

      expect(chaiHttpResponse.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível obter dados do user se o token for inválido', () => {
    before(async () => {  
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: 'invalidToken' });
    });

    it('Deve responder com status code "401"', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('Deve responder com a mensagem de erro "Expired or invalid token" no corpo da resposta', () => {
      errorMessage = { message: 'Expired or invalid token' };

      expect(chaiHttpResponse.body).to.be.eqls(errorMessage);
    });
  });
});