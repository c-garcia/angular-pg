'use strict';
var chai = require('chai');
var chaiP = require('chai-as-promised')
chai.use(chaiP);
var expect = chai.expect;

module.exports = function(){
  this.Given(/^I access the target page$/, function(){
    return browser.get('http://localhost:3000/');
  });

  this.When(/^I click on the relevant link$/, function () {
    browser.findElement(by.linkText('New quote')).click();
    return browser.findElement(by.buttonText('Notify')).click();
  });

  this.Then(/^an alert is shown$/, function () {
    var EC = protractor.ExpectedConditions;
    var msg =  browser.wait(EC.alertIsPresent(), 3000);
    return expect(browser.switchTo().alert().getText()).to.eventually.equal('hola');
  })
}
