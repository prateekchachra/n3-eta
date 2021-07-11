import React from 'react';
import * as ReactDOM from 'react-dom';
import ProductCard from '../ProductCard';


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
        ReactDOM.render(
            <ProductCard
                productTitle="Test Product"
                imgs={[]}
                price={100}
                discountPercent={50}
                buyNowHandler={()=>{console.log("Test Buy Now Handler")}}
                addToCartHandler={()=>{console.log("Test Buy Now Handler")}}
                onClickHandler={()=>{console.log("Test Buy Now Handler")}}
            />
        , container);
    })

    it("Renders Checkbox Component's dynamic Value attr correctly", () => {
        ReactDOM.render(
            <ProductCard
                productTitle="Test Product"
                imgs={[]}
                price={100}
                discountPercent={50}
                buyNowHandler={()=>{console.log("Test Buy Now Handler")}}
                addToCartHandler={()=>{console.log("Test Buy Now Handler")}}
                onClickHandler={()=>{console.log("Test Buy Now Handler")}}
            />
        , container);
        expect(document.getElementsByClassName("priceWrapper")[0]).toHaveTextContent("100");
        expect(document.getElementsByClassName("discountPriceWrapper")[0]).toHaveTextContent("50");
    })
})