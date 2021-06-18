import React from 'react';
import './App.scss';
import RadioButton from './components/atoms/radioButton/RadioButton';
import Checkbox from './components/atoms/checkbox/Checkbox';
import ProductCard from './components/organisms/productCard/ProductCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        TEAM N3-ETA
        <RadioButton id="male" name="gender" value="male" label="Male" />
        <RadioButton id="female" name="gender" value="female" label="Female" />

        <Checkbox id="car" name="mazda" value="mazda" label="Mazda" />

        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPrice={20} /> 
      </header>
    </div>
  );
}

export default App;
