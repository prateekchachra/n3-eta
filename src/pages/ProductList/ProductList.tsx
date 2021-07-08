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
    const [productList, setProducts] = useState<ProductModel[]>([]);
    const [categoryFilterOptionList, setCategoryFilterOptionList] = useState<FilterOption[]>([]);
    const [appliedCategoryFilterOptionList, setAppliedCategoryFilterOptionList] = useState<string[]>([]);
    const [applyClearAllFilter, setApplyClearAllFilter] = useState<boolean>(true);

    useEffect( () => {
        if(applyClearAllFilter) {
            fetchCategoryFilterList();
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

    function onCategoryFilterClickHandler(filters: FilterOption[]) {
        const includedFilterOptions: string[] = filters.filter( filter => filter.value)
            .map( filter => filter.label);
        if(!includedFilterOptions.length) {
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

        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }

        if(userState.isUserLoggedIn && product){
            dispatch(addProductToWishlist(Object.assign({}, product)));
        }
        
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
                    { (appliedCategoryFilterOptionList.length > 0) && <span 
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
