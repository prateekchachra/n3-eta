import React from 'react';
import Badge from "../Badge";
import * as ReactDOM from 'react-dom';


/**
 * @jest-environment jsdom
 */
describe("Badge Component Tests", () => {
    
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    it("Renders Badge Component Correctly", () => {
        ReactDOM.render(<Badge value={10} />, container);
        const spanElement = document.querySelectorAll("[data-test='badge']");
        expect(spanElement).toHaveLength(1);
        expect(spanElement[0].getAttribute('id')).toBe("quantityBadge");
    })

    it("Renders Badge Component's dynamic Value attr correctly", () => {
        ReactDOM.render(<Badge value={10} />, container);
        expect(document.querySelector("[data-test='badge']")?.getAttribute("value"))
            .toBe(10);
    })
})