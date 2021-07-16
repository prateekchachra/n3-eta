import React from 'react';
import ReactDOM from 'react-dom';
import Badge from '../Badge';

import {render} from '@testing-library/react'

import {it} from '@jest/globals';


it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Badge></Badge>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders badge correctly", () => {
    render(<Badge value="10"></Badge>)
});