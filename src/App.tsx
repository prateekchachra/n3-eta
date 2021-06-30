import React from 'react';
import './App.scss';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ContainedButton from './components/atoms/containedButton/ContainedButton';
import OutlinedButton from './components/atoms/outlinedButton/OutlinedButton';
import Search from './components/atoms/search/Search';
import Button from './components/molecules/button/Button';
import TextInput from './components/atoms/textInput/TextInput';
import DropDown, { DropDownOption } from './components/molecules/dropdown/DropDown';
import Filters, { FilterOption } from './components/organisms/filters/Filters';
import ColorSelector from './components/organisms/colorSelector/ColorSelector';
import SizeSelector from './components/organisms/sizeSelector/SizeSelector';
import { SyntheticEvent } from 'react';
import CustomerReview, {CustomerReviewType} from './components/organisms/customerReview/CustomerReview';
import HomePage from './pages/Home/HomePage';
import Profile from './pages/Profile/Profile';
import Cart from './pages/cart/Cart';
import Wishlist from './pages/Wishlist/Wishlist';
import Addresses from './pages/addresses/Addresses';
import ProductList from './pages/ProductList/ProductList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Orders/Orders';


const DROPDOWN_OPTIONS: DropDownOption[] = [{label: 'english', value: 'English'} , {label: 'spanish',
value: 'Spanish'}, {label: 'russian', value: 'Russian'}];

const FILTER_OPTIONS: FilterOption[] = [{label: 'TShirt', value: false, number: 245}, 
{label: 'Trouser', value: false, number: 105},
{label: 'Jacker', value: false, number: 65},
{label: 'Kurtas', value: false, number: 188}, ]

const COLOR_SELECTOR_OPTIONS = ['turqoise', 'blue', 'green', 'yellow']
const SIZE_SELECTOR_OPTIONS = ['39', '40', '41', '42']

const REVIEW : CustomerReviewType = {
  title: 'This product is awesome',
  text: 'Loved using this product! Every single thing was perfect',
  reviewerName: 'Prateek',
  date: '20 Dec 2017',
  score: 3
}
const imgs = [
  "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
];

function App (): JSX.Element {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/profile" component={Profile} />
                <Route path="/cart" component={Cart} />
                <Route path="/list" component={ProductList} />
                <Route path="/item" component={ProductDetail} />
                <Route path="/wishlist" component={Wishlist} />
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/addresses" component={Addresses} />
        </Switch>
      </BrowserRouter>
      {/* <header className="App-header">
        TEAM N3-ETA
        <RadioButton id="male" name="gender" value="male" label="Male" onChange={(value) => console.log(value)}/>
        <RadioButton id="female" name="gender" value="female" label="Female" onChange={(value) => console.log(value)}/>

        <CheckBox id="car" name="mazda" value="mazda" label="Mazda" onChange={(value: boolean) => console.log(value)}/>

        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={imgs} buyNowHandler={(e) => {console.log("Buy Now Clicked")}} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}} /> 

        <ContainedButton label="Add To Cart" onClick={() => {console.log('clicked')}} />

        <OutlinedButton  secondary label="Buy Now" onClick={() => {console.log('clicked')}} />

        <Button type="contained" secondary label="PLACE ORDER" onClick={() => {console.log('clicked')}} />

        <Search placeholder="Search Here..." onEnterPress={(event: SyntheticEvent) => {console.log(event)}}/>
        <TextInput placeholder="Name" onChangeText={(value: string) => {console.log(value)}}/>

        <SizeSelector label="Select Size"  values={SIZE_SELECTOR_OPTIONS}
        onSelectedChange={(selected) => console.log(selected)}/>
        <ColorSelector label="Select Color" values={COLOR_SELECTOR_OPTIONS}
        onSelectedChange={(selected) => console.log(selected)}/>
        <DropDown onSelect={(event: SyntheticEvent) => {console.log('Selected', (event.target as HTMLSelectElement).value)}} options={DROPDOWN_OPTIONS}/>
         <CustomerReview review={REVIEW}/>
         <Filters  options={FILTER_OPTIONS} onSelect={(filterOptions: FilterOption[]) => console.log('Updated Filter Options: ', filterOptions)} label="Categories"/>
      </header> */}
   
    </div>
  );
}

export default App;
