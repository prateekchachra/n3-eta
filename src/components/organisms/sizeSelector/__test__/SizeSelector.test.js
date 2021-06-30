import React from 'react';
import ReactDOM from 'react-dom';
import SizeSelector from '../SizeSelector';

import {render} from '@testing-library/react'

import {it} from '@jest/globals';


it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SizeSelector></SizeSelector>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders selector correctly", () => {
    const values = ["21", "22"];
    render(<SizeSelector label="Test" values={values} onSelectedChange={(selected) => console.log(selected)}></SizeSelector>)
});