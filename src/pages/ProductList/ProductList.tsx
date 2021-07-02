import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'

import './ProductList.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import Filters from '../../components/organisms/filters/Filters';
import RadioButton from '../../components/atoms/RadioButton/RadioButton';
import Checkbox from '../../components/atoms/CheckBox/Checkbox';

import JsonProductList from '../../assets/sampleData/Products.json';
import { addProductToCart } from '../../redux/actions/CartAction';

const ProductListPage = () => {
    const history = useHistory();
    const productList = [...JSON.parse(JSON.stringify(JsonProductList))];

    function onProductCardClickHandler(event: any) {
        event.preventDefault();
        history.push("/item");
    }

    function onAddtoCartButtonClickHandler(productId: number) {
        const product = productList.find((product: any) => product.id === productId);
        addProductToCart(product);
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
                                discountPercent={product.discountPercentage} 
                                imgs={product.images} 
                                buyNowHandler={(e) => {e.preventDefault(); console.log("Buy Now Clicked")}} 
                                addToCartHandler={(e) => {
                                    console.log("Add to Cart Clicked");
                                    onAddtoCartButtonClickHandler(product.id);
                                }}
                                onClickHandler={onProductCardClickHandler}
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

const mapStateToProps = (state: any) => ({
    cartState: state.cartState
})
  
export default connect(mapStateToProps, {addProductToCart})(ProductListPage);
