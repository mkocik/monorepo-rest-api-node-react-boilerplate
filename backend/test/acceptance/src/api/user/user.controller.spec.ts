import service from '../../../../../src/service';
import {initialize as initializeDB} from "@monorepo-boilerplate/db";
import {User} from '@monorepo-boilerplate/api-models';
import {UserFake} from "../../../fakers/user.faker";
import chaiHttp = require("chai-http");
import CONFIG from "@monorepo-boilerplate/config";
import chai = require("chai");

describe('UserController acceptance tests', () => {
  const API_PREFIX = '/' + CONFIG.API_VERSION;

  beforeEach(async () => {
    chai.use(chaiHttp);
    initializeDB();
    await User.delete();
  });

  it('#findAll should get empty users list', (done) => {
    chai.request(service).get(API_PREFIX + '/users').end((err, res) => {
      chai.should().not.exist(err);
      res.should.have.status(200);
      res.body.data.length.should.equal(0);
      done();
    })
  });

  it('#findAll should get list with one user', (done) => {
    const test = () => {
      chai.request(service).get(API_PREFIX + '/users').end((err, res) => {
        chai.should().not.exist(err);
        res.should.have.status(200);
        res.body.data.length.should.equal(1);
        done();
      })
    };

    UserFake.create().then(test);
  });

  it('#findOne should not find any user by id', (done) => {
    chai.request(service).get(API_PREFIX + '/users/test').end((err, res) => {
      chai.should().not.exist(err);
      res.body.success.should.equals(false);
      res.body.errors[0].param.should.equals('id');
      res.should.have.status(404);
      done();
    })
  });

  it('#findOne should find a proper user by id', (done) => {
    const test = (user) => {
      chai.request(service).get(API_PREFIX + '/users/' + user._id).end((err, res) => {
        chai.should().not.exist(err);
        res.should.have.status(200);
        res.body.data._id.should.not.be.undefined;
        done();
      })
    };

    UserFake.create().then(test);
  });

  it('#create should create a new user', (done) => {
    const fakeData = UserFake.getData();
    chai.request(service).post(API_PREFIX + '/users').send(fakeData).end((err, res) => {
      chai.should().not.exist(err);
      res.body.data._id.should.not.be.undefined;
      res.body.data.name.should.equal(fakeData.name);
      res.should.have.status(201);
      done();
    })
  });

  it('#create should throw validation errors', (done) => {
    chai.request(service).post(API_PREFIX + '/users').send({password: '123', email: 'test'}).end((err, res) => {
      chai.should().not.exist(err);
      res.body.errors.length.should.equal(4);
      res.should.have.status(422);
      done();
    })
  });

  it('#update should update the user', (done) => {
    const test = (user) => {
      const fakeData = UserFake.getData();
      chai.request(service).put(API_PREFIX + '/users/' + user._id).send(fakeData).end((err, res) => {
        chai.should().not.exist(err);
        res.body.data._id.should.not.be.undefined;
        res.body.data.name.should.equal(fakeData.name);
        res.should.have.status(200);
        done();
      });
    };

    UserFake.create().then(test);
  });

  it('#update should throw validation errors', (done) => {
    const test = (user) => {
      chai.request(service).put(API_PREFIX + '/users/' + user._id).send({
        password: '123',
        email: 'test'
      }).end((err, res) => {
        chai.should().not.exist(err);
        res.body.errors.length.should.equal(2);
        res.should.have.status(422);
        done();
      });
    };
    UserFake.create().then(test);
  });

  it('#remove should remove user', (done) => {
    const test = (user) => {
      chai.request(service).delete(API_PREFIX + '/users/' + user._id).end((err, res) => {
        chai.should().not.exist(err);
        chai.expect(res.body.data).to.be.undefined;
        res.should.have.status(204);
        done();
      });
    };

    UserFake.create().then(test);
  });

  it('#remove should throw validation errors', (done) => {
    chai.request(service).delete(API_PREFIX + '/users/test').send({password: '123', email: 'test'}).end((err, res) => {
      chai.should().not.exist(err);
      res.body.success.should.equals(false);
      res.body.errors[0].param.should.equals('id');
      res.should.have.status(404);
      done();
    });
  });
});
