import * as React from 'react';
import { createStore } from "redux";
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router';
import { handleInitialData } from "../actions/shared"
import NotFound from '../components/NotFound';
import { getUsers } from '../utils/api';

describe("Error Page", () => {
    it("NotFound component render snapshot", () => {
        const store = createStore(reducer, middleware);
        store.dispatch(handleInitialData());
        const component = render(
            <MemoryRouter>
                <Provider store={store}>
                    <NotFound />
                </Provider>
            </MemoryRouter>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("NotFound should render specific text", () => {
        const store = createStore(reducer, middleware);
        store.dispatch(handleInitialData());
        const component = render(
            <MemoryRouter>
                <Provider store={store}>
                    <NotFound />
                </Provider>
            </MemoryRouter>
        );
        expect(screen.findAllByText("Page not found - Error 404")).toBeTruthy();
    });
});