import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import './ProductList.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import Filters from '../../components/organisms/filters/Filters';
import RadioButton from '../../components/atoms/radioButton/RadioButton';
import Checkbox from '../../components/atoms/checkBox/Checkbox';

import JsonProductList from '../../assets/sampleData/Products.json';
import { addProductToCart } from '../../redux/cart/CartAction';
import { ProductModel } from '../../redux/cart/CartReducer';

const ProductList = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const productList = [...JSON.parse(JSON.stringify(JsonProductList))];

    function onProductCardClickHandler(productId: number) {
        history.push(`/item/${productId}`);
    }

    function onAddtoCartButtonClickHandler(productId: number) {
        const product: ProductModel = productList.find((product: any) => product.id === productId);
        dispatch(addProductToCart(Object.assign({}, product, {quantity: 1})));
    }

    //TODO: create component for BreadCrums
    function renderBreadCrumsRow() {
        return (
            <div className="breadCrumsContainer">
                <div className="breadCrums">
                    Menu / Men / TShirts
                </div>
            </div>
        )
    }

    function renderPageTitleRow() {
        return (
            <div className="pageTitleContainer">
                <div className="pageTitle">
                    MEN COLLECTIONS
                </div>
            </div>
        )
    }

    function renderFilterColumn() {
        return (
            <div className="filterColumnContainer">
                <div className="filterTitleContainer">
                    <span className="filterTitle">Filters</span>
                    <a href="" className="clearFilterTitle">Clear All</a>
                </div>
                <div className="filterContainer primaryFilterText">
                    <RadioButton id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <RadioButton id="women" name="gender" value="women" label="Women" onChange={() => {console.log("")}}/>
                </div>
                <div className="filterContainer secondaryFilterText">
                    <label className="secondaryFilterTitleText">Categories</label>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                </div>
                <div className="filterContainer secondaryFilterText">
                    <label className="secondaryFilterTitleText">Categories</label>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                </div>
                <div className="filterContainer secondaryFilterText">
                    <label className="secondaryFilterTitleText">Categories</label>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                    <Checkbox id="men" name="gender" value="men" label="Men" onChange={() => {console.log("")}}/>
                </div>
                
            </div>
        );
    }

    function renderProductListColumn() {
        return (
            <div className="productSearchListColumnContainer">
                <div className="productListContainer">
                    {   productList &&
                        productList.map((product: any) => {

                            return (<ProductCard key={product.id}
                                productTitle={product.name} 
                                price={product.price} 
                                discountPercent={product.discountPercent} 
                                imgs={product.images} 
                                buyNowHandler={(e) => {e.preventDefault(); console.log("Buy Now Clicked")}} 
                                addToCartHandler={(e) => {
                                    console.log("Add to Cart Clicked");
                                    onAddtoCartButtonClickHandler(product.id);
                                }}
                                onClickHandler={(event: React.MouseEvent<Element, MouseEvent>) => {
                                    event.preventDefault();
                                    onProductCardClickHandler(product.id);
                                }}
                            />)
                        })
                    }
                </div>
            </div>
        )
    }

    function renderBody() {
        return (
            <div className="bodyComponent">
                {renderBreadCrumsRow()}
                {renderPageTitleRow()}
                <div className="mainBody">
                    {renderFilterColumn()}
                    {renderProductListColumn()}
                </div>
            </div>
        );
    }

    return (
        <PageTemplate>{renderBody()}</PageTemplate>
    )
}

export default ProductList;
