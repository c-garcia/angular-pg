'use strict';

const MongoClient = require('mongodb');

exports = module.exports = function(opts){
  if(!opts){
    opts = {};
  }
  this.host = opts.host || 'localhost';
  this.port = opts.port || '27017';
  this.db = opts.db || 'test';
  this.url = `mongodb://${this.host}:${this.port}/${this.db}`;
  this._db = null;

  this.connect = function(){
    this._db = MongoClient.connect(this.url);
  }

  this.db = function(){
    return this._db;
  }
    
  this.findAllQuotes = function(){
    return this.db()
      .then((db) => (db.collection('quotes').find().toArray()))
  };
  this.findAllCustomerNames = function(){
    return this.db()
      .then((db) => (db.collection('quotes').distinct('customer')));
  };
  this.addQuote = function(quoteName, customerName){
    return this.db()
      .then((db) => (db.collection('quotes').insertOne(
        {name:quoteName, customer: customerName}
      )))
      .then((res) => (res.ops[0]._id));
  };
  this.connect();
}
