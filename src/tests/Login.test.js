import * as React from 'react';
import { createStore } from "redux";
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router';
import { handleInitialData } from "../actions/shared"
import Login from '../components/Login';
import {getUsers} from '../utils/api';

describe("Login", () => {
  
  it("Login component render snapshot", () => {
    const store = createStore(reducer, middleware);
    store.dispatch(handleInitialData());
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("Log On button should be disabled - no user selected", async () => {
    const store = createStore(reducer, middleware);
    const  users = getUsers();
    
    const component = render(
      <Provider store={store}>
        <Login users={users} />
      </Provider>
    );
    var logForm = component.getByTestId('log-form')
    var logOnButton = component.getByTestId('log-button')
    expect(logForm).toBeInTheDocument();
    expect(logOnButton).toBeDisabled();
  });


  it('Log On button should be enabled - user selected', () => {
    const store = createStore(reducer, middleware);
    const  users = getUsers();
    
    const component = render(
      <Provider store={store}>
        <Login users={users} />
      </Provider>
    );

    var select = component.getByTestId('select-user');
    fireEvent.change(select, { target: { value: 'sarahedo' } });

    var logForm = component.getByTestId('log-form')
    var logOnButton = component.getByTestId('log-button');
    expect(logForm).toBeInTheDocument();
    expect(logOnButton).toBeEnabled();

  })
});