'use strict';

angular.module('quote-model', [])
  .service('quoteService', ['$q', '$timeout', function($q, $timeout){
    var self = this;
    self.quotes = [
      {id:0, name: 'Quote1', customer: 'Customer1'},
      {id:1, name: 'Quote2', customer: 'Customer2'},
      {id:2, name: 'Quote3', customer: 'Customer2'}
    ];
    self.nextId = 3;
    self.findQuotes = function(){
      return $q(function(resolve, reject){
        $timeout(function(){
          resolve(self.quotes)
        }, 1000);
      });
    };
    self.findCustomers = function(){
      return $q(function(resolve, reject){
        $timeout(function(){
          var uniq_customers = _.flow(
            _.map(_.get('customer')),
            _.uniq
          );
          resolve(uniq_customers(self.quotes));
        })
      });
    };
    self.createQuote = function(quoteName, customerName){
      return $q(function(resolve, reject){
        $timeout(function(){
          self.quotes.push({
            id:self.nextId,
            name: quoteName,
            customer: customerName
          });
          self.nextId++;
          resolve(self.nextId);
        }, 2000)
      });
    };
  }])
