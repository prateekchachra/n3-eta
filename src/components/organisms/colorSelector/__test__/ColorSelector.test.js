import React from 'react';
import ReactDOM from 'react-dom';
import ColorSelector from '../ColorSelector';

import {render} from '@testing-library/react'
    
import {it} from '@jest/globals';


it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ColorSelector></ColorSelector>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders selector correctly", () => {
    const values = ["blue", "green"];
    render(<ColorSelector label="Test" values={values} onSelectedChange={(selected) => console.log(selected)}></ColorSelector>)
});