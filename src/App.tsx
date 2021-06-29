import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';
import Header from './components/molecules/Header/Header';
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

import HomePage from './pages/Home/HomePage';
import ProductListPage from './pages/ProductList/ProductListPage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';

const imgs = [
  "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
];

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/mens" component={ProductListPage} />
          <Route path="/womens" component={ProductListPage} />
          <Route path="/product-detail" component={ProductDetailPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
