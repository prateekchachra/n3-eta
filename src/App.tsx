import React from 'react';
import './App.scss';
import RadioButton from './components/atoms/radioButton/RadioButton';
import Checkbox from './components/atoms/checkbox/Checkbox';
import ProductCard from './components/organisms/productCard/ProductCard';
import ContainedButton from './components/atoms/containedButton/ContainedButton';
import OutlinedButton from './components/atoms/outlinedButton/OutlinedButton';
import Search from './components/atoms/search/Search';
import Button from './components/molecules/button/Button';
import TextInput from './components/atoms/textInput/TextInput';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        TEAM N3-ETA
        <RadioButton id="male" name="gender" value="male" label="Male" />
        <RadioButton id="female" name="gender" value="female" label="Female" />

        <Checkbox id="car" name="mazda" value="mazda" label="Mazda" />

        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPrice={20} /> 
        
        <ContainedButton label="Add To Cart" onClick={() => {console.log('clicked')}} />

        <OutlinedButton label="Buy Now" onClick={() => {console.log('clicked')}} />

        <Button type="contained" label="PLACE ORDER" onClick={() => {console.log('clicked')}} />

        <Search placeholder="Search Here..." onEnterPress={(value: string) => {console.log(value)}}/>
        <TextInput placeholder="Name" onChangeText={(value: string) => {console.log(value)}}/>
      </header>
   
    </div>
  );
}

export default App;
