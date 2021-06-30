import React from 'react';
import ReactDOM from 'react-dom';
import ContainedButton from '../ContainedButton';

import {render} from '@testing-library/react'

import {it} from '@jest/globals';


it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ContainedButton></ContainedButton>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders ContainedButton correctly", () => {
    render(<ContainedButton label="Test" onClick={() => console.log('Clicked')} secondary></ContainedButton>)
});