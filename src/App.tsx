import React from 'react';
import './App.scss';
import RadioButton from './components/atoms/RadioButton/RadioButton';
import CheckBox from './components/atoms/CheckBox/CheckBox';
import ProductCard from './components/organisms/ProductCard/ProductCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        TEAM N3-ETA
        <RadioButton id="male" name="gender" value="male" label="Male" onChange={(value) => console.log(value)}/>
        <RadioButton id="female" name="gender" value="female" label="Female" onChange={(value) => console.log(value)}/>

        <CheckBox id="car" name="mazda" value="mazda" label="Mazda" onChange={(value) => console.log(value)}/>

        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} /> 
      </header>
    </div>
  );
}

export default App;
