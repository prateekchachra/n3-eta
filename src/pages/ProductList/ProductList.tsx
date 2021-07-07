import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../api/axios';
import './ProductList.scss';
import PageTemplate from '../../components/templates/PageTemplate';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import Filters, { FilterOption } from '../../components/organisms/filters/Filters';

import { addProductToCart } from '../../redux/cart/CartAction';
import { ProductModel } from '../../redux/cart/CartReducer';
import { RootState } from '../../store';
import { addProductToWishlist } from '../../redux/wishlist/WishlistActions';
import { showLoginModal } from '../../redux/loginModal/LoginModalActions';

const ProductList = () :JSX.Element => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {gender} = useParams<Record<string, string | undefined>>();
    const {queryParam} = useParams<Record<string, string | undefined>>();
    const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);
    const wishlistItems = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems;
    const[productList, setProducts] = useState<ProductModel[]>([]);
    const[categoryFilterOptionList, setCategoryFilterOptionList] = useState<FilterOption[]>([]);
    const[appliedCategoryFilterOptionList, setAppliedCategoryFilterOptionList] = useState<string[]>([]);


    useEffect( () => {
        fetchCategoryList();
    }, [])

    useEffect( () => {
        if(gender) {
            fetchProductLisyByGender();
        }
    }, [gender]);

    useEffect( () => {
        if(queryParam) {
            searchProductListByTitle();
        }
    }, [queryParam]);

    useEffect( () => {
        if(appliedCategoryFilterOptionList) {
            fetchFilteredByCategoriesProducts();
        } else {
            fetchProductLisyByGender();
        }
    }, [appliedCategoryFilterOptionList]);

    const fetchCategoryList = async() => {
        const categoriesResponse = await axios.get(`/categories`);
        setCategoryFilterOptionList(categoriesResponse.data.map((category: string) => {
            return {
                label: category,
                value: false,
                number: 10
            }
        }));
        return categoriesResponse.data;
    }

    const fetchProductLisyByGender = async () => {
        const productsResponse = await axios.get(`/products?gender=${gender}`);
        setProducts(productsResponse.data);
        return productsResponse;
    }
    
    const searchProductListByTitle = async () => {
        const queryResponse = await axios.get(`/products?name_like='*${queryParam}*`);
        if(queryResponse.data) {
            if(productList) {
                setProducts([]);
            }
            setProducts(queryResponse.data);
        }
        return queryResponse;
    }

    
    const onAddToWishlistHandler = (product: ProductModel) => {

        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }

        if(userState.isUserLoggedIn && product){
            dispatch(addProductToWishlist(Object.assign({}, product)));
        }
        
    }

    const fetchFilteredByCategoriesProducts = async () => {
        const appliedCategoryFilterCount = appliedCategoryFilterOptionList.length;

        if(appliedCategoryFilterCount > 0) {
            const queryString = appliedCategoryFilterOptionList[appliedCategoryFilterOptionList.length - 1];
            const searchResult = await axios.get(`/products?category=${queryString}&gender=${gender}`);

            if(searchResult.data) {
                if(appliedCategoryFilterCount == 1) {
                    setProducts([]);
                    setProducts([...searchResult.data]);
                } else {
                    setProducts(productList.concat(searchResult.data));
                }
            }
            return searchResult.data;
        }

        return;
    }

    function onCategoryFilterClickHandler(filters: FilterOption[]) {
        const excludedFilterOptions: string[] = [];
        const includedFilterOptions: string[] = [];

        filters.forEach( filter => {
            if(filter.value) {
                includedFilterOptions.push(filter.label);
            } else {
                excludedFilterOptions.push(filter.label);
            }
        })

        if(excludedFilterOptions) {
            setProducts( productList.filter( (product: ProductModel) => !excludedFilterOptions.includes(product.category)));
        }

        if(includedFilterOptions.length >= appliedCategoryFilterOptionList.length) {
            setAppliedCategoryFilterOptionList(appliedCategoryFilterOptionList.concat(includedFilterOptions.filter(filter => !appliedCategoryFilterOptionList.includes(filter))));
            console.log(appliedCategoryFilterOptionList);
        }
    }

    function onProductCardClickHandler(productId: number) {
        history.push(`/item/${productId}`);
    }

    function onAddtoCartButtonClickHandler(product: ProductModel) {

        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }

        if(userState.isUserLoggedIn && product) {
            dispatch(addProductToCart(Object.assign({}, product, {quantity: 1})));
        }
    }

    function onBuyNowButtonClickHandler(product: ProductModel | null) {
        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }
        if(userState.isUserLoggedIn && product) {
            dispatch(addProductToCart(Object.assign({}, product, {quantity: 1})));
            history.push("/checkout");
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
                <Filters 
                    options={categoryFilterOptionList} 
                    label="Categories" 
                    onSelect={ (filters) => onCategoryFilterClickHandler(filters) }
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

                            const isAddedInWishlist = wishlistItems.filter(item => item.id === product.id).length > 0;
                            return (<ProductCard key={product.id}
                                productTitle={product.name} 
                                price={product.price} 
                                discountPercent={product.discountPercent} 
                                imgs={product.images} 
                                buyNowHandler={() => onBuyNowButtonClickHandler(product)}  
                                isAddedInWishlist={isAddedInWishlist}
                                onAddToWishlist={() => onAddToWishlistHandler(product)}
                                addToCartHandler={ () => onAddtoCartButtonClickHandler(product) }
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
