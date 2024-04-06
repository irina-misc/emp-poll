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
import App from '../components/App';

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

  it("Log On button should be disabled if no user selected", async () => {
    const store = createStore(reducer, middleware);

    const response = await store.dispatch(handleInitialData()).catch(e => e);
    const { users } = store.getState();
    //console.log(users);
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


  it('Log On button should be enabled if user selected', () => {
    const store = createStore(reducer, middleware);
    let users = {
      sarahedo: {
        id: 'sarahedo',
        password: 'password123',
        name: 'Sarah Edo',
        avatarURL: './images/sarahedo.JPG',
        answers: {
          "8xf0y6ziyjabvozdd253nd": 'optionOne',
          "6ni6ok3ym7mf1p33lnez": 'optionOne',
          "am8ehyc8byjqgar0jgpub9": 'optionTwo',
          "loxhs1bqm25b708cmbf3g": 'optionTwo'
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
      }
    };
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