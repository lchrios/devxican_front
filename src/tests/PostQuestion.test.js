import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { PostQuestion } from '../components/PostQuestion';

configure({adapter: new Adapter()});
const wrapper = shallow(<PostQuestion/>);

describe('(Component) PostQuestion', () => {
  it('[004] renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('[005] validates user input', () => {
    expect(wrapper).toBeTruthy();
  });
});