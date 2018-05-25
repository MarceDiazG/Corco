require('events').EventEmitter.prototype._maxListeners = 50;

"use strict";

var Yadda = require('yadda');
Yadda.plugins.mocha.StepLevelPlugin.init();
var path = require('path');
var library = require('./test/steps/library.js');
var webdriver = require('selenium-webdriver');
var fs = require('fs');
var driver;
var browsers=['chrome', 'firefox', 'ie', 'phantomjs', 'MicrosoftEdge' , 'opera'];
//var driverFunctions= require("./driverFunctions.js");

new Yadda.FeatureFileSearch('./test/features').each(function(file) {
    featureFile(file, function(feature) {

        before(function(done) {
            executeInFlow(function() {

                driver = newDriver(browsers[0]);
               //driver.manage().window().maximize();  //setSize(1024, 768); //(1400,1000);
                driver.manage().timeouts().implicitlyWait(10000);
            }, done);
        });

        scenarios(feature.scenarios, function(scenario) {
            steps(scenario.steps, function(step, done) {
                executeInFlow(function() {
                    Yadda.createInstance(library, { driver: driver }).run(step);
                }, done);
            });
        });

        afterEach(function() {
            takeScreenshotOnFailure(this.currentTest);
        });

        after(function(done) {
            driver.quit().then(done);
        });
    });
});

function newDriver(whichBrowser) {

    if (whichBrowser.indexOf('phantomjs') == -1) {
        return new webdriver.Builder().forBrowser(whichBrowser).build();
    } else {

        var phantom = require('phantomjs-prebuilt');

        var capabilities = webdriver.Capabilities.phantomjs();
        capabilities.set(webdriver.Capability.ACCEPT_SSL_CERTS, true);
        capabilities.set(webdriver.Capability.SECURE_SSL, false);
        capabilities.set("phantomjs.cli.args",
            ["--web-security=no",
                "--ssl-protocol=any",
                "--ignore-ssl-errors=yes"]
        );
        return new webdriver.Builder().withCapabilities(capabilities).build();
    }
}
function executeInFlow(fn, done) {
    webdriver.promise.controlFlow().execute(fn).then(function() {
        done();
    }, done);
}
function takeScreenshotOnFailure(test) {
    if (test.state != 'passed') {
        var date = new Date();
        var currentH = ' ' + date.getHours()+'-'+date.getMinutes();
        var path = './test/screenshots/' + test.title.replace(/\W+/g, '_').toLowerCase()+ currentH + '.png';
        driver.takeScreenshot().then(function(data) {
            fs.writeFileSync(path, data, 'base64');
        });
    }
}

