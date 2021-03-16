import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './components/Inventory/Inventory';
import NotMatch from './components/NotMatch/NotMatch';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


  export const UserContext=createContext();

function App() {
const [loggedInUser,setloggedInUser]=useState({});
  return (
    
    <UserContext.Provider value={[loggedInUser,setloggedInUser]}>
      <h1>{loggedInUser.email}</h1>
     

      <Router>
      <Header></Header>
        <Switch>

          <Route path="/Shop">
            <Shop></Shop>
          </Route>

          <Route path="/Order">
            <Review></Review>
          </Route>

          <PrivateRoute path="/Inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/Shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/Login">
            <Login></Login>
          </Route>

          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path="/product/:productKey">
          <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <NotMatch></NotMatch>
          </Route>


        </Switch>
      </Router>






    </UserContext.Provider>
  )


}

export default App;
