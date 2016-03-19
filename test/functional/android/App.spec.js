import {
  wd,
  expect,
  should,
  androidCapabilities
} from "./../.setup";

import { initialState as initLocation } from '../../../src/redux/modules/userLocation';

describe("App", () => {
  var driver;

  before(() => {
    driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
    return driver.init(androidCapabilities).setImplicitWaitTimeout(20000);
  });

  after(() => driver.quit());

  describe("Layout", () => {

    it("should display a map", () => {
      return driver
        .elementByXPath('//android.view.View')
        .should.eventually.exist;
    });

    it("should display default initial userLocation", () => {
      return driver
        .elementByXPath('//android.widget.TextView[1]')
        .text().should.become(`LATITUDE: ${initLocation.latitude}\n`)

        .elementByXPath('//android.widget.TextView[2]')
        .text().should.become(`LONGITUDE: ${initLocation.longitude}\n`);
    });
  });

  describe("UserLocation updates", () => {

    it('changes displayed location when GPS location changes', () => {
      return driver
        .setGeoLocation(10, 10, 0)

        .elementByXPath('//android.widget.TextView[1]')
        .text().should.become('LATITUDE: 10\n')
        .elementByXPath('//android.widget.TextView[2]')
        .text().should.become('LONGITUDE: 10\n')

        .setGeoLocation(20, 20, 0)

        .elementByXPath('//android.widget.TextView[1]')
        .text().should.become('LATITUDE: 20\n')
        .elementByXPath('//android.widget.TextView[2]')
        .text().should.become('LONGITUDE: 20\n');
    });
  });

  describe('Cryptographic Functionality', () => {
    it('calculates & displays hmac of latlng when location changes', () => {

      return driver
        .setGeoLocation(10,10, 0)

        .elementByXPath('//android.widget.TextView[3]')
        .text().should.become('e4573a4994b4b2a846b83178eb3aea9f060893bdffed49e8b115d1093d02a168')

        .setGeoLocation(20, 20, 0)
        .elementByXPath('//android.widget.TextView[3]')
        .text().should.become('b769476a42397ea08a4dde6d45c5ee7eef286eb738ffb597ac676cff6fc6a207');
    });
      
  });
  
});


