import React from 'react';
import Checkbox from '../Checkbox';
import * as ReactDOM from 'react-dom';


describe("Checkbox Component Tests", () => {
    
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    it("Renders Checkbox Component Correctly", () => {
        ReactDOM.render(<Checkbox id="testCheckBox" name="testCheckBox" value="shirt" label="Shirt" onChange={() => console.log("clicked")}/>, container);
        const checkBoxElement = document.querySelectorAll("input");
        expect(checkBoxElement).toHaveLength(1);
        expect(checkBoxElement[0].getAttribute('id')).toBe("testCheckBox");
    })

    it("Renders Checkbox Component's dynamic Value attr correctly", () => {
        ReactDOM.render(<Checkbox id="testCheckBox" name="testCheckBox" value="shirt" label="Shirt" onChange={() => console.log("clicked")}/>, container);
        expect(document.querySelectorAll("input")[0]?.getAttribute("value"))
            .toBe("shirt");
    })
})