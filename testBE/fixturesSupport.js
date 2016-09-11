'use strict';

const MongoClient = require('mongodb').MongoClient;
const quoteList = [
  {name: 'Quote one', customer: 'Customer1'},
  {name: 'Quote two', customer: 'Customer2'},
  {name: 'Quote three', customer: 'Customer3'},
  {name: 'Quote four', customer: 'Customer1'}
];

function optsToURL(opts){
  let res = `mongodb://${opts.host||'localhost'}:${opts.port||27017}/${opts.db||'test'}`;
  return res;
}

exports = module.exports = {
  quoteList: quoteList,

  migrateDB: function(configPath, envName){
    const DBMigrate = require('db-migrate');
    let migrator = DBMigrate.getInstance(true, {
      config: configPath,
      env: envName,
      'logLevel': 'error'
    });
    return migrator.up();
  },
  
  setUpDB: function(dbOpts, callback){
    MongoClient.connect(optsToURL(dbOpts), (err, db) => {
      db.collection('quotes').deleteMany({})
        .then(() => (db.collection('quotes').insertMany(quoteList)))
        .then(() => (db.close()))
        .then(() => (callback()));
    })
  },
  setUpEmptyDB: function(opts, callback){
    MongoClient.connect(optsToURL(opts), (err, db) => {
      db.collection('quotes').deleteMany({})
        .then(() => (db.close()))
        .then(() => (callback()));
    })
  }
}
