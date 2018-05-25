//var oracledb = require('oracledb');
/*oracledb.getConnection(
 {
 user: "tw",
 password: "tw",
 connectString: "jdbc:oracle:thin:@tdb1.tweb.twdev3.websys.tmcs:1521:twdev3"
 });*/
functions = {

    /**
     * Function to show current hour of execution
     * @returns {string}
     */
    showTime: function () {

        var f = new Date();
        var hour = f.getHours();
        var minutes = f.getMinutes();
        var seconds = f.getSeconds();
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var message = hour + ":" + minutes + ":" + seconds;
        return "Time: " + message;
    },

    /**
     * Method to take and save a screenshot
     * @param filename
     * @param webdriver
     * @param driver
     * @param fs
     * @returns {webdriver.WebDriver.saveScreenshot}
     */
    takeScreenshot: function (filename, webdriver, driver, fs) {
        return webdriver.WebDriver.prototype.saveScreenshot = function (filename) {
            var screenshotPath = 'test\\screenshots\\';
            var date = new Date();
            screenshotPath += date.getTime();
            return driver.takeScreenshot().then(function (data) {
                fs.writeFile(screenshotPath + filename, data.replace(/^data:image\/png;base64,/, ''), 'base64', function (err) {
                    if (err) throw err;
                });
            })
        };
    },
    getVenueName: function (text) {
        var index = text.indexOf(",");
        if(index>-1){
            text= text.substr(0,index);
        }
        return text;
    },
    getOrderAndDateEvent: function (text) {
        var result={"order":"","date":""};
        var indexNum= text.indexOf("#");
        var indexOn = text.indexOf(" on ");
        if(indexOn>-1){
            result.order= text.substr(indexNum+1, indexOn-indexNum-1);
        }
        if(indexNum>-1){
            result.date= text.substr(indexOn+4,text.length-(indexOn+4));
        }
        return result;
    },
    cleanOrderConfirmation: function (text) {
        var index = text.indexOf("#:");
        if(index>-1){
            text= text.substr(index+2,text.length-index-2);
        }
        return text.trim();
    },
    cleanOrderDateInfo: function (text) {
        var index = text.indexOf(" on ");
        if(index>-1){
            text= text.substr(index+4,text.length-index-4).trim();
        }
        return text;
    },
    /**
     * Method to wait 'x' in seconds in the execution flow
     * @param seconds
     * @param webdriver
     */
    waitSeconds: function (seconds, webdriver) {
        var flow = webdriver.promise.controlFlow();
        flow.execute(function () {
            return webdriver.promise.delayed(seconds * 1000);
        });
    },

    /**
     * Method to wait milliseconds in the execution flow
     * @param milliseconds
     */
    sleep: function (milliseconds) {
        var start = new Date().getTime();

        var timer = true;
        while (timer) {
            if ((new Date().getTime() - start) > milliseconds) {
                timer = false;
            }
        }
    } /*,

     getQuery: function (err, connection) {
     if (err) {
     console.error(err.message);
     return;
     }

     connection.execute(
     "SELECT * " +
     "FROM TW_CONSUMER c " +
     "WHERE c.CONSUMERID = 21694678;",
     //"WHERE manager_id < :id",
     //[110],  // bind value for :id
     function (err, result) {
     if (err) {
     console.error(err.message);
     return;
     }
     console.log(result.rows);
     });
     }*/
}
;
module.exports = functions;
