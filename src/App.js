import React, { createContext, useState } from 'react';
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
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>{loggedInUser.email}</h3>

      <Router>
        <Header></Header>

        <Switch>

          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>

          <PrivateRoute path="/manage">
            <Manage></Manage>
          </PrivateRoute>

          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
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


    </UserContext.Provider>
  );
}

export default App;
