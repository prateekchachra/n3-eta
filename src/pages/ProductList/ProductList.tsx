import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../api/axios';
import './ProductList.scss';
import PageTemplate from '../../components/templates/PageTemplate';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import Filters, { FilterOption } from '../../components/organisms/filters/Filters';
import InputRange, { Range } from 'react-input-range';

import { ProductModel } from '../../redux/cart/CartReducer';
import { RootState } from '../../store';
import { addProductinToCart, addProductinToWishlist } from '../../redux/user/UserActions';
import { showLoginModal } from '../../redux/loginModal/LoginModalActions';
import Loader from "react-loader-spinner";

const ProductList = () :JSX.Element => {
    const MIN_PRICE_RANGE = 199;
    const MAX_PRICE_RANGE = 1999;
    const history = useHistory();
    const dispatch = useDispatch();
    const {gender} = useParams<Record<string, string | undefined>>();
    const {queryParam} = useParams<Record<string, string | undefined>>();
    const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);
    const wishlistItems = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems;
    const [productList, setProducts] = useState<ProductModel[]>([]);
    const [categoryFilterOptionList, setCategoryFilterOptionList] = useState<FilterOption[]>([]);
    const [priceFilter, setPriceFilter] = useState<Range>({ max: MAX_PRICE_RANGE, min: MIN_PRICE_RANGE})
    const [appliedCategoryFilterOptionList, setAppliedCategoryFilterOptionList] = useState<string[]>([]);
    const [applyClearAllFilter, setApplyClearAllFilter] = useState<boolean>(true);
    const [showLoader, setShowLoader] = useState<boolean>(false);

    useEffect( () => {
        if(applyClearAllFilter) {
            fetchCategoryFilterList();
            setPriceFilter({ max: MAX_PRICE_RANGE, min: MIN_PRICE_RANGE});
        }
    }, [applyClearAllFilter])

    useEffect( () => {
        if(gender) {
            fetchProductListByGender();
        } else {
            fetchProductList();
        }
    }, [gender]);

    useEffect( () => {
        if(queryParam) {
            searchProductListByTitle();
        }
    }, [queryParam]);

    useEffect( () => {
        if(appliedCategoryFilterOptionList.length) {
            fetchFilteredByCategoriesProducts();
        }
    }, [appliedCategoryFilterOptionList]);

    const fetchCategoryFilterList = async() => {
        const categoriesFilterResponse = await axios.get("/filters")
        setCategoryFilterOptionList(categoriesFilterResponse.data.categories.map((category: string) => {
            return {
                label: category,
                value: false,
                number: 10
            }
        }));
    }

    const fetchProductList = async () => {
        const productsResponse = await axios.get("/products");
        setProducts(productsResponse.data);
        
        return productsResponse;
    }

    const fetchProductListByGender = async () => {
        setShowLoader(true);
        const productsResponse = await axios.get(`/products?gender=${gender}`);
        setProducts(productsResponse.data);
        setShowLoader(false);
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

    const fetchFilteredByCategoriesProducts = async () => {

        if(appliedCategoryFilterOptionList) {
            const searchQueries = appliedCategoryFilterOptionList.map( queryString => {
                if(!gender) {
                    return axios.get(`/products?category=${queryString}`)    
                }
                return axios.get(`/products?category=${queryString}&gender=${gender}`)
            });

            const results = await Promise.all(searchQueries)
                .then( response => {
                    const searcuResults = response.filter( result => result.data)
                        .flatMap( result => result.data);
                    if(searcuResults) {
                        return searcuResults;
                    }
                    return [];
                })
                .catch( error => {
                    console.log(error);
                });
            if(results) {
                setProducts(results);
            }
        } else {
            console.log("From else");
        }

        return;
    }

    const fetchProductListByPriceRange = async (value: Range) => {

        const url = `/products?discountedPrice_gte=${value.min}&discountedPrice_lte=${value.max}` + 
            ((gender) ? `&gender=${gender}` : '');
        const searchResult = await axios.get(url);
        if(searchResult.data) {
            setProducts(searchResult.data);
        }

    }

    function onCategoryFilterClickHandler(filters: FilterOption[]) {
        const includedFilterOptions: string[] = filters.filter( filter => filter.value)
            .map( filter => filter.label);
        if(!includedFilterOptions.length) {
            setApplyClearAllFilter(true);
            if(gender) {
                fetchProductListByGender();
            } else {
                fetchProductList();
            }
        } else {
            setApplyClearAllFilter(false);
            setAppliedCategoryFilterOptionList(includedFilterOptions);
        }
    }

    function onPriceRangeFilterChangeHandler(value: Range) {
        if(value.min > MIN_PRICE_RANGE || value.max < MAX_PRICE_RANGE) {
            setApplyClearAllFilter(false);
            fetchProductListByPriceRange(value);
        } else {
            setApplyClearAllFilter(true);
            if(gender) {
                fetchProductListByGender();
            } else {
                fetchProductList();
            }
        }
    }

    function onClearAllClickHandler() {
        if(appliedCategoryFilterOptionList) {
            setAppliedCategoryFilterOptionList([]);
            if(gender) {
                fetchProductListByGender();
            } else {
                fetchProductList();
            }
        }
        setApplyClearAllFilter(true);
    }

    function onProductCardClickHandler(productId: number) {
        history.push(`/item/${productId}`);
    }

    const onAddToWishlistHandler = (product: ProductModel) => {
        dispatch(addProductinToWishlist(product));
    }

    function onAddtoCartButtonClickHandler(product: ProductModel) {
        dispatch(addProductinToCart(product));
    }

    function onBuyNowButtonClickHandler(product: ProductModel | null) {
        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }
        if(userState.isUserLoggedIn && product) {
            dispatch(addProductinToCart(Object.assign({}, product, {quantity: 1})));
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
                    {gender && <p>{gender}&apos;s COLLECTION</p>}
                    {!gender && <p> Special Deal Collection</p>}
                </div>
            </div>
        )
    }

    function renderFilterColumn() {
        return (
            <div className="filterColumnContainer">
                <div className="filterTitleContainer">
                    <span className="filterTitle">Filters</span>
                    { !applyClearAllFilter && <span 
                        className="clearFilterTitle"
                        onClick={() => onClearAllClickHandler()}
                    >
                        Clear All
                    </span>}
                </div>
                <div className="secondaryFilterTitleText">
                    <Filters
                        options={categoryFilterOptionList} 
                        label="Categories" 
                        onSelect={ (filters) => onCategoryFilterClickHandler(filters) }
                    />  
                </div>
                <div className="priceRangeFilterWrapper">
                    <div className="priceRangeFilterTitleText">Price</div>
                    <InputRange
                        maxValue={1999}
                        minValue={199}
                        value={priceFilter}
                        draggableTrack={true}
                        onChange={(value) => {
                            setPriceFilter(value as Range);
                            console.log();
                        }}
                        onChangeComplete={(value) => onPriceRangeFilterChangeHandler(value as Range)}
                    />
                </div>
            </div>
        );
    }

    function renderProductListColumn() {
        return (
            <div className="productSearchListColumnContainer">
                <div className="productListContainer">
                    {   productList &&
                        productList.map((product: ProductModel) => {

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
                    { showLoader && 
                        <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
                      />
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
