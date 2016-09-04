'use strict';

(function(angular){
  angular.module("myApp",['ui.router', 'ngMaterial'])
    .config(['$stateProvider', function($stateProvider, quoteService){
      $stateProvider.state({
        'name': 'list-quotes',
        'url': '/list-quotes',
        'template': '<h1>list quotes</h1>',
        'controller': 'listQuotesCtrl as listQ'
      });
      $stateProvider.state({
        'name': 'new-quote',
        'url': '/new-quote',
        'template': '<h1>new quote</h1>',
        'controller': 'newQuoteCtrl as newQ'
      })
    }])
    .controller('listQuotesCtrl', [function(){
      console.log('listQuotesCtrl started');
    }])
    .controller('newQuoteCtrl', [function(){
      console.log('newQuoteCtrl started');
    }])
    .factory('quoteService', ['$q', function($q){
      var listQuotes = function(){
        return $q(function(resolve, reject){reject('to be implemented');});
      };
      return {
        listQuotes: listQuotes
      }
    }]);
})(angular);
