'use strict';

(function(angular){
  angular.module("myApp",['ui.router', 'ngMaterial', 'quote-model'])
    .config(['$stateProvider', function($stateProvider){
      $stateProvider.state({
        'name': 'root',
        'templateUrl': 'js/actions/root.tpl.html',
        'controller': 'topCtrl as top',
        'abstract': true,
        'data': {
          'title': ''
        }
      })
      $stateProvider.state({
        'name': 'root.list-quotes',
        'url': '/list-quotes',
        'templateUrl': 'js/actions/listQuotes.tpl.html',
        'controller': 'listQuotesCtrl as listQ',
        'data': {
          'title': 'List quotes'
        }
      });
      $stateProvider.state({
        'name': 'root.new-quote',
        'url': '/new-quote',
        'templateUrl': 'js/actions/newQuote.tpl.html',
        'controller': 'newQuoteCtrl as newQ',
        'data': {
          'title': 'Create quote'
        }
      })
    }])
    .controller('topCtrl', ['$state', function($state){
      console.log('topCtrl started');
      this.getTitle = function(){
        return $state.current.data.title;
      }
    }])
    .controller('listQuotesCtrl', ['quoteService', function(quoteService){
      var self = this;
      console.log('starting listQuotesCtrl');
      quoteService.findQuotes().then(function(quotes){
        self.quotes = quotes;
      });
    }])
    .controller('newQuoteCtrl', ['quoteService', '$state', function(quoteService, $state){
      var vm = this;
      this.customers = [];
      this.activate = function(){
        quoteService.findCustomers().then(function(customers){
          vm.customers = customers;
        });
      }
      this.findCustomers = function(){
        return this.customers;
      }

      this.saveQuote = function(){
        quoteService.createQuote(vm.name, vm.customer).then(function(res){
          $state.go('root.list-quotes');
        });
      }
        
      this.activate();
    }])
    .run(['$state', function($state){
      $state.transitionTo('root.list-quotes');
      console.log('initial state set');
    }]);
})(angular);
