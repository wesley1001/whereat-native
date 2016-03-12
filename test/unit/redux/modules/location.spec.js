import { expect, deep } from "chai"

describe("location module" , () => {
  const location = require('../../../../src/redux/modules/location')

  describe("locationReducer", () => {
    describe("on LOCATION_CHANGED", () => {
      it("should overwrite currentLocation with new latitude and longitude", () => {
        const state = {
          location: {
            latitude: 51.05,
            longitude: -0.13,
            lastUpdatedTime: 1455047952
          }
        };
        const action = {
          type: location.LOCATION_CHANGED,
          payload: {
            location: {
              latitude: 51.51,
              longitude: -0.14,
              lastUpdatedTime: 1455060001
            }
          }
        };
        const newState = location.reducer(state, action);
        expect(newState).to.deep.equal({
          location: {
            latitude: 51.51,
            longitude: -0.14,
            lastUpdatedTime: 1455060001
          }
        });
      });
      it("should work with undefined state", () => {
        const action = {
          type: location.LOCATION_CHANGED,
          payload: {
            location: {
              latitude: 5,
              longitude: 1,
              lastUpdatedTime: 30
            }
          }
        }
        const newState = location.reducer(undefined, action);
        expect(newState).to.deep.equal({
          location: {
            latitude: 5,
            longitude: 1,
            lastUpdatedTime: 30
          }
        });
      });
    });
    describe("on unrecognized type", () => {
      it("should not change state", () => {
        const state = {
          aProperty: 3
        };
        const action = {
          type: "unrecognized",
          aProperty: 4
        };
        const newState = location.reducer(state, action);
        expect(newState).to.deep.equal(state);
      });
    });
  });

  describe("locationChanged action creator", () => {
    it("should create action of type LOCATION_CHANGED, setting location property", () => {
      const aLocation = {
        latitude: 5,
        longitude: 1,
        lastUpdatedTime: 30
      };
      expect(location.locationChanged(aLocation)).to.deep.equal({
        type: location.LOCATION_CHANGED,
        payload: {
          location: aLocation
        }
      });
    });
  });
});