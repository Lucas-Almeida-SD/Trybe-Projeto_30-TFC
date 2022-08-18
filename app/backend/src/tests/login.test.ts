import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import { 
  loginUserRepositoryFindOneResponse,
  nonExistingEmailLoginRequest,
  nonExistingPasswordLoginRequest,
  invalidEmailLoginRequest,
} from './mocks/dataMocks';

import UserRepository from '../database/models/repository/User.repository';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota "POST /login"', () => {
  let chaiHttpResponse: Response;
  let errorMessage: { message: string };

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
      (UserRepository.findOne as sinon.SinonStub).restore();
    });

    it('Deve responder com status code "200"', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Deve responder com um token no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.have.property('token');
      expect(chaiHttpResponse.body.token).to.be.a('string');
    });
  });

  describe('Será validado que não é possível realizar login sem informar um email', () => {
    before(async () => {  
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(nonExistingEmailLoginRequest);
    });

    it('Deve responder com status code "400"', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('Deve responder com a mensagem de erro "All fields must be filled" no corpo da resposta', () => {
      errorMessage = { message: 'All fields must be filled' };

      expect(chaiHttpResponse.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível realizar login sem informar uma senha', () => {
    before(async () => {  
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(nonExistingPasswordLoginRequest);
    });

    it('Deve responder com status code "400"', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('Deve responder com a mensagem de erro "All fields must be filled" no corpo da resposta', () => {
      errorMessage = { message: 'All fields must be filled' };

      expect(chaiHttpResponse.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível realizar login com um email inválido', () => {
    before(async () => {  
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(invalidEmailLoginRequest);
    });

    it('Deve responder com status code "401"', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('Deve responder com a mensagem de erro "Incorrect email or password" no corpo da resposta', () => {
      errorMessage = { message: 'Incorrect email or password' };

      expect(chaiHttpResponse.body).to.be.eqls(errorMessage);
    });
  });
});
