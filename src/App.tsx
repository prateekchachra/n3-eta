import React from 'react';
import './App.scss';
import RadioButton from './components/atoms/RadioButton/RadioButton';
import CheckBox from './components/atoms/CheckBox/Checkbox';
import ProductCard from './components/organisms/ProductCard/ProductCard';
import ContainedButton from './components/atoms/containedButton/ContainedButton';
import OutlinedButton from './components/atoms/outlinedButton/OutlinedButton';
import Search from './components/atoms/search/Search';
import Button from './components/molecules/button/Button';
import TextInput from './components/atoms/textInput/TextInput';
import DropDown from './components/molecules/dropdown/DropDown';
import Filters from './components/organisms/filters/Filters';

const imgs = [
  "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        TEAM N3-ETA
        <RadioButton id="male" name="gender" value="male" label="Male" onChange={(value) => console.log(value)}/>
        <RadioButton id="female" name="gender" value="female" label="Female" onChange={(value) => console.log(value)}/>

        <CheckBox id="car" name="mazda" value="mazda" label="Mazda" onChange={(value: boolean) => console.log(value)}/>

        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={imgs} buyNowHandler={(e) => {console.log("Buy Now Clicked")}} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}} /> 

        <ContainedButton label="Add To Cart" onClick={() => {console.log('clicked')}} />

        <OutlinedButton label="Buy Now" onClick={() => {console.log('clicked')}} />

        <Button type="contained" label="PLACE ORDER" onClick={() => {console.log('clicked')}} />

        <Search placeholder="Search Here..." onEnterPress={(value: string) => {console.log(value)}}/>
        <TextInput placeholder="Name" onChangeText={(value: string) => {console.log(value)}}/>


        {/* <DropDown options={[{label: 'english', value: 'English'} , {label: 'english',
      value: 'English'}]}/> */}
        {/* <Filters  options={[{label: 'TShirt', value: false, number: 245}, 
        {label: 'Trouser', value: false, number: 105},
        {label: 'Jacker', value: false, number: 65},
        {label: 'Kurtas', value: false, number: 188}, ]} onSelect={(filterOptions: [any]) => console.log('Updated Filter Options: ', filterOptions)} label="CATEGORIES"/> */}
      </header>
   
    </div>
  );
}

export default App;
