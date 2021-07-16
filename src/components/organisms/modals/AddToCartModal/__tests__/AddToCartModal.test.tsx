import React from 'react';
import AddToCardModal from '../AddToCardModal';
import * as ReactDOM from 'react-dom';


describe("Add To Cart Modal Component Tests", () => {
    
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