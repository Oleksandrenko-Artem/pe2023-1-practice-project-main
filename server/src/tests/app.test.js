const request = require('supertest');
const { expect } = require('chai');
const yup = require('yup');
const app = require('./../app');

const TOKEN_VALIDATION_SCHEMA = yup.object({
  token: yup.string().matches(/^[A-Za-z0-9!@#$%^&*()_-]+\.[A-Za-z0-9!@#$%^&*()_-]+\.[A-Za-z0-9!@#$%^&*()_-]+$/).required(),
});

const userCredentials = { email: 'creative@gmail.com', password: '123456' };

describe('Testing app', () => {
  describe('Testing public endpoints', () => {
    describe('GET /offers', () => {
      it('Response should be [] when GET /offers', done => {
        request(app).get('/offers').expect(200).then(res => {
          expect(res.body).to.be.an('array');
          done();
        }).catch(err => done(err));
      });
    });
    describe('POST /login', () => {
      it('Response should be 200 { token: "fndjfb.idofug.oisfh" } when credentials is correct', done => {
        request(app).post('/login').send(userCredentials).expect(200).then(res => {
          expect(TOKEN_VALIDATION_SCHEMA.isValidSync(res.body)).to.be.true;
          done();
        }).catch(err => done(err));
      });
      it('Response should be 404 "user with this data didn`t exist" when user email isn`t correct', done => {
        request(app).post('/login').send({ email: 'sdkghisdhfjd@gmail.com', password: '123456' }).expect(404).expect('user with this data didn`t exist').end(done);
      });
      it('Response should be 404 "wrong password" when password isn`t correct', done => {
        request(app).post('/login').send({ email: 'creative@gmail.com', password: '123456789' }).expect(404).expect('Wrong password').end(done);
      });
    });
  });
  describe('Testing private endpoints', () => {
    let token = '';
    before((done) => {
      request(app).post('/login').send(userCredentials).then(res => {
        token = res.body.token;
        done();
      }).catch(err => done(err));
    });
    describe('POST /getUser', () => {
      it('Response should be 200 {user} when token exists+correct', done => {
        request(app).post('/getUser').set('Authorization', token).expect(200).expect('Content-Type', /json/).then(res => {
          expect(res.body.email).to.equal(userCredentials.email);
          done();
        }).catch(err => done(err));
      });
      it('Response should be 408 "need token" when token is missed', done => {
        request(app).post('/getUser').expect(408).expect('need token').end(done);
      });
      it('Response should be 408 "token error" when token isn`t correct', done => {
        request(app).post('/getUser').set('Authorization', 'jkdvn').expect(408).expect('token error').end(done);
      });
    });
  });
});

