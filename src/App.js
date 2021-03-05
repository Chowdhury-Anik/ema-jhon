import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import Catagories from './components/Cataagories/Catagories';
import BestSelling from './components/BestSelling/BestSelling';
import NotFound from './components/NotFound/NotFound';
import ProductsDetail from './components/ProductDetails/ProductsDetail';


function App() {

  return (

    <div>
      <Header></Header>
      <Router>
        <Switch>

          <Route path="/shop">
          <Shop></Shop>
          </Route>

          <Route path="/review">
          <Review></Review>
          </Route>

          <Route path="/manage">
            <Manage></Manage>
          </Route>

          <Route path="/catagories">
            <Catagories></Catagories>
          </Route>
          <Route path="/Best-Selling">
          <BestSelling></BestSelling>
          </Route>

          <Route path="/product/category/:productKey">
            <ProductsDetail></ProductsDetail>
          </Route>

          <Route exact path="/">
           <Shop></Shop>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      
      
    </div>
  );
}

export default App;
