import React from 'react';
import ConfirmationModal from '../ConfirmationModal';
import * as ReactDOM from 'react-dom';


describe("Confirm Modal Component Tests", () => {
    
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