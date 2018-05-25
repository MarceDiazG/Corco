"use strict";
var Yadda = require('yadda');
var webdriver = require('selenium-webdriver');
var fs = require('fs');

var homePage = require('../controllers/homePage'),
    functions = require('../controllers/functions'),
    assert = require('assert'),
    yadda = require('yadda'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
var selectCountryFlag = 0;
var data;
module.exports = (function () {

    var dictionary = new Yadda.Dictionary()
        .define('LOCALE', /(fr|es|ie)/);
    var library = new Yadda.localisation.English.library(dictionary)


        .given("Load basic url", function () {
           var driver = this.driver;
           driver.get("http://streeteasy.com");

        })
        .when("Search $Location, $Custom for a start value of $Price", function (Location, Custom,Price) {
            var driver = this.driver;
            homePage.searchWithParameters(driver, Location, Custom, Price);
        })
        .then("I validate that first element showed is according to criteria to $Price", function (Price) {
            var driver = this.driver;
            homePage.checkCorrectPrice(driver,Price);
        })
        .then("Check flow of checkout", function () {
            var driver = this.driver;
        });
    return library;
})();
