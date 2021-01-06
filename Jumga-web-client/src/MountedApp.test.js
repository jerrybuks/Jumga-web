import React from 'react';
import {MountedApp} from './MountedApp';
import { shallow } from 'enzyme';


describe('MountedApp component', () => {
  let wrapper;
  beforeEach(() => {
    const mockProps = {
      currentUser : {}
    };
    wrapper = shallow(<MountedApp {...mockProps} />);
  });

  it('should render MountedApp component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
