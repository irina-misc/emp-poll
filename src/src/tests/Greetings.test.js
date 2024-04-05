import * as React from 'react';
import { render } from '@testing-library/react';
import Greetings from '../components/Greetings';


describe('Greetings', () => {
    it('matches the snapshot when a name is passed', () => {
        var component = render(
            <Greetings name={'Mike'}/>
        );
        expect(component).toMatchSnapshot();
    });

    it('matches the snapshot when no name is passed', () => {
        var component = render(
            <Greetings />
        );
        expect(component).toMatchSnapshot();
    });
});