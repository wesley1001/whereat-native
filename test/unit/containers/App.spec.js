import chai from 'chai';
chai.should();

import React, { View } from "react-native";
import { createStore } from 'redux';
import { shallow } from "enzyme";
import reducer from '../../../src/redux/reducer';

import Root from "../../../src/components/Root";
import App from '../../../src/containers/App';

describe('App container', () => {

  const store = createStore(reducer);
  const app = shallow(<App store={store}/>);
  const state = store.getState();

  it('maps state to props', () => {
    app.find('Root').prop('userLocation').should.eql(state.userLocation);
  });

  it('maps dispatch to props', () => {
    app.find('Root').prop('userLocationChanged').should.exist;
  });
});
