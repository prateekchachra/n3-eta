import React from 'react';
import ReactDOM from 'react-dom';
import OutlinedButton from '../OutlinedButton';

import {render} from '@testing-library/react'

import {it} from '@jest/globals';


it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<OutlinedButton></OutlinedButton>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders OutlinedButton correctly", () => {
    render(<OutlinedButton label="Test" onClick={() => console.log('Clicked')} primary></OutlinedButton>)
});