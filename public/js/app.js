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
        'templateUrl': 'js/actions/newQuote.tpl.html',
        'controller': 'newQuoteCtrl as newQ'
      })
    }])
    .controller('listQuotesCtrl', [function(){
      console.log('listQuotesCtrl started');
    }])
    .controller('newQuoteCtrl', ['$window', '$timeout',  function($window, $timeout){
      this.message = function(msg){
        $window.alert(msg);
      };
      this.show = false;
      var vm = this;
      console.log('newQuoteCtrl started');
      $timeout(function(){
        vm.show = true;
        console.log('made it visible');
      },2000);
    }])
    .factory('quoteService', ['$q', function($q){
      var listQuotes = function(){
        return $q(function(resolve, reject){reject('to be implemented');});
      };
      return {
        listQuotes: listQuotes
      }
    }])
    .run(['$state', function($state){
      $state.transitionTo('list-quotes');
      console.log('initial state set');
    }]);
})(angular);
