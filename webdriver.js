"use strict";
var webdriver = require('selenium-webdriver');

module.exports = function webDriver(browser) {
    var driver;

    if (browser) {
        driver = new webdriver.Builder().usingServer().withCapabilities({
            'browserName': browser
        }).build();
    } else {
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

    }

    return driver;
}
