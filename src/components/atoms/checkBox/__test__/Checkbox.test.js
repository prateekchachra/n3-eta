import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from '../Checkbox';

import {render} from '@testing-library/react'

import {it} from '@jest/globals';


it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Checkbox></Checkbox>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders checkbox correctly", () => {
    render(<Checkbox id="Test" name="Test" value="Test" label="Test" onChange={(checked) => console.log(checked)}></Checkbox>)
});
