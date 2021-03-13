import React from 'react';

const ReviewItems = (props) => {
  
    const {name,quantity,key,price}=props.product;
    const styleReview={borderBottom:'1px solid grey',
    paddingBottom:'15px',
    marginLeft:'115px',
color:'red'}
    
    return (
        <div  style={styleReview} className="review-item">
            <h4 className=".product-name">{name}</h4>
            <p><small>${price}</small></p>
            <h3>Quantity:{quantity}</h3>
            <br/>
            <button className="main-btn" onClick={()=>props.removeProduct(key)}>Remove Item</button>

        </div>
    );
};

export default ReviewItems;