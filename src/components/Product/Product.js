import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const {img,name,seller,price,stock}=props.product;
    
    
    return (
        <div className="product">
           <div className="product-img">
           <img src={img} alt=""/>
           </div>
           <div className="product-name">
           <h4>{name}</h4>
           <br/>
           <i>by : {seller}</i>
           <p className="price"><strong>${price}</strong></p>
           <p>Only {stock} left in stock!!!Order Soon.</p>
            <button className="main-btn" onClick={ () =>props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            
            
             

           </div>
        </div>
    );
};

export default Product;