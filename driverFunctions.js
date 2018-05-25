/**
 * Created by marcelo.diaz on 05/01/2017.
 */
driverFunctions = {
    newDriver: function (webdriver, whichBrowser) {

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
};