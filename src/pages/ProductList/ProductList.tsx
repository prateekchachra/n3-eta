import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../api/axios';
import './ProductList.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import Filters, { FilterOption } from '../../components/organisms/filters/Filters';
import RadioButton from '../../components/atoms/radioButton/RadioButton';

import { addProductToCart } from '../../redux/cart/CartAction';
import { ProductModel } from '../../redux/cart/CartReducer';
import { RootState } from '../../store';

type ProductListProps = {
    searchQuery?: string
}

const ProductList = ( { searchQuery}: ProductListProps) :JSX.Element => {
    const history = useHistory();
    const {gender} = useParams<Record<string, string | undefined>>();
    const dispatch = useDispatch();
    const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);
    const[productList, setProducts] = useState<ProductModel[]>([]);
    const[categoryFilterOptionList, setCategoryFilterOptionList] = useState<FilterOption[]>([]);
    const [appliedCategoryFilterOptionList, setAppliedCategoryFilterOptionList] = useState<FilterOption[]>([]);

    useEffect( () => {
        const fetchProducts = async () => {
            const productsResponse = await axios.get(`/products?gender=${gender}`);
            const categoriesResponse = await axios.get(`/categories`);
            setProducts(productsResponse.data);
            setCategoryFilterOptionList(categoriesResponse.data.map((category: string) => {
                return {
                    label: category,
                    value: false,
                    number: 10
                }
            }));
            return {productsResponse, categoriesResponse};
        }
        fetchProducts();
    }, [gender]);

    useEffect( () => {
        fetchFilteredByCategoriesProducts();
    }, [appliedCategoryFilterOptionList]);

    const searchProductListByTitle = async () => {
        if(searchQuery) {
            const queryResponse = await axios.get(`/products?name_like='*${searchQuery}*`);
            console.log(queryResponse.data);
        }
    }

    const fetchFilteredByCategoriesProducts = async () => {
        if(appliedCategoryFilterOptionList) {
            /* const queryString = appliedCategoryFilterOptionList.map( (filter, index) => {
                
                if(index > 0) {

                }
            }) */
            console.log(appliedCategoryFilterOptionList.map(filter => filter.label).toString());
        }
    }


    function onProductCardClickHandler(productId: number) {
        history.push(`/item/${productId}`);
    }

    function onAddtoCartButtonClickHandler(productId: number) {
        if(userState.isLoggedIn && productList) {
            const product: any = productList.find((product: ProductModel) => product.id === productId);
            dispatch(addProductToCart(Object.assign({}, product, {quantity: 1})));
        }
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
                <Filters 
                    options={categoryFilterOptionList} 
                    label="Categories" 
                    onSelect={ (filters: FilterOption[]) => {
                        console.log(filters);
                        setAppliedCategoryFilterOptionList(filters.filter(filter => filter.value));
                    }}
                />  
                <Filters 
                    options={categoryFilterOptionList} 
                    label="Categories" 
                    onSelect={ (value: FilterOption[]) => {
                        console.log(value);
                    }}
                />
                
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
