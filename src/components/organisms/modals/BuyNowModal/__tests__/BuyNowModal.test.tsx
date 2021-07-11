import React from 'react';
import BuyNowModal from '../BuyNowModal';
import * as ReactDOM from 'react-dom';


describe("Buy Now Modal Component Tests", () => {
    
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })
})