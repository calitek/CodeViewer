"use strict";

import React from 'react';
import { shallow, mount, render } from 'enzyme';

jest.unmock('../ui-src/components/app.ctrl');
import AppCtrl from '../ui-src/components/app.ctrl';

describe('<AppCtrl /> shallow', () => {
  const wrapper = shallow(<AppCtrl />);
  it('checks div count', () => {
    expect(wrapper.find('div').length).toEqual(3);
  });
  it('checks br count', () => {
    expect(wrapper.find('br').length).toEqual(0);
  });
  it('checks TreeCtrl count', () => {
    expect(wrapper.find('TreeCtrl').length).toEqual(1);
  });
  it('checks SnipsCtrl count', () => {
    expect(wrapper.find('SnipsCtrl').length).toEqual(1);
  });
});
