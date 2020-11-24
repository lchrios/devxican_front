import React, { useState } from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallowWithIntl } from 'enzyme';
import { Auth0Provider } from "@auth0/auth0-react";

import { Home } from './../components/Home';
import { LoginButton } from './../components/LoginButton';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const JSDOM = require('jsdom').JSDOM
Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
})
global.crypto.subtle = {}

const mockSuccessResponse = 
  [
    { 
      _id: 12345,
      title: 'TEST',
      description: 'test'
    }
  ];
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});
jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

configure({adapter: new Adapter()});
const wrapper = mount(
  <Auth0Provider
    domain="eel-tec.auth0.com"
    clientId="pZ01yFUM6Nki4qfPnKoRiAn3TuvvO7bf"
    redirectUri={process.env.REACT_APP_CALLBACK_URL}
  >
    <Home/>
  </Auth0Provider>
);

describe('(Component) Home', () => {
  it('[001] renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('[002] redirects on login click event', () => {
    const button = wrapper.find(LoginButton);
    const redirect = button.simulate('click');
    expect(redirect).toBeTruthy();
  });

  it('[003] redirects on title click event', () => {
    const title = wrapper.find('h4')
    const link = title.find('a');
    expect(link.props().href).toContain('/pregunta/')
  });

});
