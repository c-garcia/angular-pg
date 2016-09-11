'use strict';

const chai = require('chai');
const chaiP = require('chai-as-promised');
chai.use(chaiP);
const expect = chai.expect;
const fixtures = require('./fixturesSupport');

const QuoteDBO = require('../lib/quotedbo');
var migrateOpts;
var mongoOpts;
var sut;

describe('QuoteDBO', function(){
  before(function(done){
    const dotenv = require('dotenv');
    dotenv.config();

    migrateOpts = {
      config: process.env['ANGPG_MIGR_CONF'],
      env: process.env['ANGPG_MIGR_ENV']
    };

    mongoOpts = {
      host: process.env['ANGPG_DB_HOST'],
      port: process.env['ANGPG_DB_PORT'],
      db: process.env['ANGPG_DB_DB']
    };

    sut = new QuoteDBO(mongoOpts);

    fixtures.migrateDB(migrateOpts.config, migrateOpts.env).then(done);
  });
  describe('when there are persisted quotes', function(){
    beforeEach(function(done){
      fixtures.setUpDB(mongoOpts, done);
    });
    describe('.findAllQuotes', function(){
      it('returns a non-empty array of quotes', function(){
        return expect(sut.findAllQuotes())
          .to
          .eventually
          .have.lengthOf(fixtures.quoteList.length);
      });
    });
    describe('.findAllCustomerNames', function(){
      it('returns all existing customers', function(){
        return expect(sut.findAllCustomerNames())
          .to.eventually
          .include('Customer1')
          .and.to
          .include('Customer2')
          .and.to
          .include('Customer3');
      });
      it('returns no addtional customers', function(){
        return expect(sut.findAllCustomerNames())
          .to.eventually
          .have.lengthOf(3);
      });
    });
    describe('.addQuote', function(){
      describe('when adding a quote with a unique name', function(){
        xit('persists it', function(){
        });
        it('returns the quote identifier', function(){
          return expect(sut.addQuote('non-existing', 'non-existing customer'))
            .eventually
            .to.match(/^[a-z0-9]+$/);
        });
      });
      describe('when adding a quote with an existing name', function(){
        it('it rejects with "non-unique name" error', function(){
          return expect(sut.addQuote(fixtures.quoteList[0].name, 'non-existing customer'))
            .to
            .be.rejectedWith("non-unique name");
        });
      });
    });
  });
  describe('when there are no persisted quotes', function(){
    beforeEach(function(done){
      fixtures.setUpEmptyDB(mongoOpts, done);
    });
    describe('.findAllQuotes', function(){
      it('returns an empty array of quotes', function(){
        return expect(sut.findAllQuotes())
          .to
          .eventually
          .have.lengthOf(0);
      });
    });
    describe('.findAllCustomerNames', function(){
      it('returns an empty array', function(){
        return expect(sut.findAllCustomerNames())
          .to.eventually
          .have.lengthOf(0);
      });
    });
  });
})
