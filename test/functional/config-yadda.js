"use strict";

var Yadda = require('yadda'),
    selenium = require('selenium-webdriver'),
    webdriver = require('./webdriver'),
    fs = require('fs'),
    driver,
    browser = process.env.browser,
    component = process.env.component;

Yadda.plugins.mocha.StepLevelPlugin.init();
new Yadda.FeatureFileSearch('./test/functional/features').each(function(file) {
    featureFile(file, function(feature) {
        before(function(done) {
            driver = webdriver(browser);
            done();
        });

        var filePath = file.split("/"),
            fileName = filePath[filePath.length - 1].split("-");


        if (feature.annotations.component == component) {
            scenarios(feature.scenarios, function(scenario) {
                var library = require('./steps/' + fileName[0] + '-library');

                steps(scenario.steps, function(step, done) {
                    executeInFlow(function() {
                        new Yadda.Yadda(library, {

                        }).yadda(step);
                    }, done);
                });
            });
        }

        after(function(done) {
            logErrors(this.currentTest);
            driver.quit().then(done);
        });
    });
});

function executeInFlow(fn, done) {
    selenium.promise.controlFlow().execute(fn).then(function() {
        done();
    }, done);
}

function logErrors(test) {
    if (test.status != 'passed') {
        driver.manage().logs().get('browser').then(function(logs) {
            console.log("BROWSER ERRORS!:");
            for (log in logs) {
                console.log(logs[log].level.name);
                console.log(logs[log].message);
            }
        });
    }
}
