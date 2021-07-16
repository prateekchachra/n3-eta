import React from 'react';
import RadioButton from '../RadioButton';
import * as ReactDOM from 'react-dom';


describe("RadioButton Component Tests", () => {
    
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    it("Renders Radio Button Component Correctly", () => {
        ReactDOM.render(<RadioButton id="testRadioButton" name="testRadioButton" value="male" label="Male" onChange={() => {}}/>, container);
        const radioButtonElement = document.querySelectorAll("input");
        expect(radioButtonElement).toHaveLength(1);
        expect(radioButtonElement[0].getAttribute('id')).toBe("testRadioButton");
    })

    it("Renders Radio Button Component's dynamic Value attr correctly", () => {
        ReactDOM.render(<RadioButton id="testRadioButton" name="testRadioButton" value="male" label="Male" onChange={() => {}}/>, container);
        expect(document.querySelectorAll("input")[0]?.getAttribute("value"))
            .toBe("male");
    })
})