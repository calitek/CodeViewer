"use strict";

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import AppCtrl from '../ui-src/components/app.ctrl';

describe('shallow(<AppCtrl />)', () => {
  const wrapper = shallow(<AppCtrl />);
  it('checks div count', () => {
    expect(wrapper.find('div').length).to.equal(2);
  });
  it('checks TreeView count', () => {
    expect(wrapper.find('TreeView').length).to.equal(1);
  });
  it('checks FileView count', () => {
    expect(wrapper.find('FileView').length).to.equal(1);
  });
});
