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
import FullPageLoader from '../../components/atoms/fullPageLoader/FullPageLoader';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import AddToCartModal from '../../components/organisms/modals/AddToCartModal/AddToCardModal';



const ProductList = () :JSX.Element => {
    const MIN_PRICE_RANGE = 199;
    const MAX_PRICE_RANGE = 1999;
    const history = useHistory();
    const dispatch = useDispatch();

    const {gender} = useParams<Record<string, string | undefined>>();
    const {queryParam} = useParams<Record<string, string | undefined>>();

    const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);
    
    const [productList, setProducts] = useState<ProductModel[]>([]);
    const [categoryFilterOptionList, setCategoryFilterOptionList] = useState<FilterOption[]>([]);
    const [priceFilter, setPriceFilter] = useState<Range>({ max: MAX_PRICE_RANGE, min: MIN_PRICE_RANGE})
    const [appliedCategoryFilterOptionList, setAppliedCategoryFilterOptionList] = useState<string[]>([]);
    const [applyClearAllFilter, setApplyClearAllFilter] = useState<boolean>(true);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showAddToCart, setShowAddToCart] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
    
    const {formatMessage} = useIntl();

    useEffect( () => {
        if(applyClearAllFilter) {
            fetchCategoryFilterList();
            setPriceFilter({ max: MAX_PRICE_RANGE, min: MIN_PRICE_RANGE});
        }
    }, [applyClearAllFilter])

    useEffect( () => {
        if(gender && queryParam) {
            searchProductListByTitle();
        } else if(gender && !queryParam) {
            fetchProductListByGender();
        } else if(!gender && queryParam) {
            searchProductListByTitle();
            if(appliedCategoryFilterOptionList.length) {
                setApplyClearAllFilter(true);
            }
        } else {
            fetchProductList();
        }
    }, [gender, queryParam]);

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
        setShowLoader(true);
        const productsResponse = await axios.get("/products");
        setProducts(productsResponse.data);
        setShowLoader(false);
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
        setShowLoader(true);
        const url = (gender) ? `/products?gender=${gender}&name_like='*${queryParam}*`
            : `/products?name_like='*${queryParam}*`;
        const queryResponse = await axios.get(url);
        if(queryResponse.data) {
            if(productList) {
                setProducts([]);
            }
            setProducts(queryResponse.data);
        }
        setShowLoader(false);
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

 

    function onAddToCartHandler(product: ProductModel){
        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }
        setSelectedProduct(product);
        setShowAddToCart(true);
    }

    function onAddtoCartClickHandler(size: string, color: string, quantity: number) {
        dispatch(addProductinToCart(Object.assign({}, selectedProduct, 
            {quantity, size, color})));
        
        toast(formatMessage({id: 'added_to_cart'}), {
            type: 'success'
        })
        setShowAddToCart(false);
    }

    function onBuyNowClickHandler(size: string, color: string, quantity: number) {
        
        if(userState.isUserLoggedIn && selectedProduct) {
            dispatch(addProductinToCart(Object.assign({}, selectedProduct, 
                {quantity, size, color})));
            history.push("/cart");
        }
    }


    const onAddToWishlistHandler = (product: ProductModel, isAddedInWishlist: boolean) => {
        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }
        isAddedInWishlist ? toast(formatMessage({id: 'remove_wishlist'}),
        {type: 'success'}) :
        toast(formatMessage({id: 'add_wishlist'}),
         {type: 'success'})

        dispatch(addProductinToWishlist(product));
    }

   
    const onAddToCartHide = () => {
        setShowAddToCart(false);
        setSelectedProduct(null);
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
                    {(gender && !queryParam) && <p><FormattedMessage id={`${gender}_collection`}/></p>}
                    {(!gender && queryParam) && <p><FormattedMessage id="search_results"/></p>}
                    {(!gender && !queryParam) && <p> <FormattedMessage id="special_collection"/></p>}
                </div>
            </div>
        )
    }

    function renderFilterColumn() {
        return (
            <div className="filterColumnContainer">
                <div className="filterTitleContainer">
                    <span className="filterTitle"><FormattedMessage id="filters" /></span>
                    { !applyClearAllFilter && <span 
                        className="clearFilterTitle"
                        onClick={() => onClearAllClickHandler()}
                    >
                        <FormattedMessage id="clear_all" />
                    </span>}
                </div>
                <div className="secondaryFilterTitleText">
                    <Filters
                        options={categoryFilterOptionList} 
                        label={formatMessage({id: 'categories'})}
                        onSelect={ (filters) => onCategoryFilterClickHandler(filters) }
                    />  
                </div>
                <div className="priceRangeFilterWrapper">
                    <div className="priceRangeFilterTitleText"><FormattedMessage id="price" /></div>
                    <InputRange
                        maxValue={1999}
                        minValue={199}
                        value={priceFilter}
                        draggableTrack={true}
                        onChange={(value) => {
                            setPriceFilter(value as Range);
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
                    {
                        !showLoader && productList.length == 0 &&
                        <h4 className="noProductsTextHeader">No Products Available</h4>
                    }
                    
                    {   !showLoader && productList &&
                        productList.map((product: ProductModel) => {

                            const isAddedInWishlist = ( userState.user.wishList &&
                                userState.user.wishList.wishlistItems.filter(item => item.id === product.id).length > 0);
                            return (<ProductCard key={product.id}
                                productTitle={product.name} 
                                price={product.price} 
                                discountPercent={product.discountPercent} 
                                imgs={product.images} 
                                isAddedInWishlist={isAddedInWishlist}
                                onAddToWishlist={() => onAddToWishlistHandler(product, isAddedInWishlist)}
                                addToCartHandler={ () => onAddToCartHandler(product) }
                                onClickHandler={(event: React.MouseEvent<Element, MouseEvent>) => {
                                    event.preventDefault();
                                    onProductCardClickHandler(product.id);
                                }}
                            />)
                        })
                    }
                    
                    { showLoader && 
                        <FullPageLoader/>
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
            <AddToCartModal 
                show={showAddToCart}
                onHide={onAddToCartHide}
                onBuyNowClick={onBuyNowClickHandler}
                onAddClick={onAddtoCartClickHandler}
                />
            </div>
        );
    }

    return (
        <PageTemplate>{renderBody()}</PageTemplate>
    )
}

export default ProductList;
