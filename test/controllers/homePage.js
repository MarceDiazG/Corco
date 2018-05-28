//var config = require('config').myAccount;

var functions, fs, chai, expect, should;
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;
functions = require("./functions.js");
fs = require('fs');
chai = require('chai');
expect = chai.expect;
should = chai.should();
var https = require('https');
var parseString = require('xml2js').parseString;
var xml = '';

var buttonSearch = webdriver.By.className("Button Button--classicBlue");
var inputNeighborhood = webdriver.By.className("AreaSearch-textBox");
var labelAdressSearch = webdriver.By.className("CheckBox-label CheckBox-label--outsideInput AreaList-listInput AreaList-listInput--indent1");
var selectPrice = webdriver.By.id("price_from");
var optionCustom = webdriver.By.xpath("//select[@id='price_from']//*[contains(text(),'Custom')]");
var inputCustomValue = webdriver.By.className("InputText Home-searchRangeCustom");
var firstElementAsOptionValue = webdriver.By.className("price-info");
var elementsOptions = webdriver.By.className("price");

homePage = {

     /**
     * Method used to complete search input values in form
     * according to parameters sent
     * @param driver
     * @param Location
     * @param Custom
     * @param Price
     */
    searchWithParameters: function(driver, Location, Custom, Price){
        console.log("\Going to search Location:" + Location);
        driver.findElement(buttonSearch).isDisplayed().then(function (Search) {
            console.log(">> Buton found OK!....\n");
            driver.findElement(inputNeighborhood).then(function (Adress) {
                Adress.click().then(function(){

                    Adress.sendKeys(Location).then(function(){

                        driver.findElement(labelAdressSearch).isDisplayed().then(function (foundedLocation) {
                            foundedLocation.click().then(function () {
                                homePage.selectPriceInForm(driver,Custom,Price).then(function () {
                                     console.log("Parameters selected OK");
                                     buttonSearch.click().then(function(){

                                         //Check that list options page is loaded
                                         driver.findElement(firstElementAsOptionValue).then(function(){
                                            return callback(true);
                                         });
                                     });
                                 }, function (err) {
                                    console.log("Error on input parameters.... !");
                                    return callback(false);
                                });
                             });
        
                        });
                    });
                });
                
            });
            return true;
        }, function () {
            console.log(">> ERROR, button Search is not present!\n");
        });
    },
    /**
     * Method used to complete Price form data
     * @param driver
     * @param Custom
     * @param Price
     */
    selectPriceInForm: function(driver,Custom,Price){
        driver.findElement(selectPrice).isDisplayed().then(function (mySelect) {
            console.log(">> Select Price found OK!, let's continue....\n");
            mySelect.click().then(function(){
                if (Custom=="Yes"){
                driver.findElement(optionCustom).isDisplayed().then(function (CustomOption) {
                    CustomOption.click().then(function(){
                        driver.findElement(inputCustomValue).isDisplayed().then(function(inputValue){
                            inputValue.sendKeys(Price);
                        });
                    });
                }, function () {
                    console.log(">> ERROR, button Search is not present!!!\n");
                });
            }
            });
        }, function () {
            console.log(">> ERROR, Select Price component is not present!!!\n");
        });
    },
     /**
     * Method used to check if first showed option is according 
     * to Price value sent 
     * @param driver
     * @param Price
     */
    checkCorrectPrice: function(driver, Price){
        console.log("\nGoing to validate search" + Price);
        driver.findElements(elementsOptions).then(function (listElementsResult) {
            console.log(">> Option showed  OK!....\n");
            var inputCustomValue = listElementsResult[0];
            inputCustomValue.getAttribute("textContent").then(function (textContent) {
                textContent = textContent.trim();

                var result = (parseInt(textContent)>=(parseInt(Price)));
                expect(result).to.be.true;
                console.log("  - First showed value checked OK!");
            });
            return true;
        }, function () {
            console.log(">> ERROR, in showed value!!!\n");
        });

    }
}
;
module.exports = homePage;