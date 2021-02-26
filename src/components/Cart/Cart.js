import React from 'react';

const Cart = (props) => {
    const cart=props.cart;
   const total= cart.reduce( (total,product) => total + product.price, 0);
     const Total= total.toFixed(2);

     
//      let Total=0;
//  for(let i=0;i<cart.length;i++)
//  {
//      const product=cart[i];
//       Total=Total+product.price;
//       Total.toFixed(2);

    
//  }

 let shippingCost=0;
 if(Total > 35)
 {
     shippingCost=0;
     
 }
 else if( Total >15)
 {
     shippingCost=4.99;
 }
 else if (Total>0){
     shippingCost=12.99;
 }


    let tax=Total*0.1;
   tax=Math.round(tax);
   


  

   
  const grand=Number(Total)+Number(shippingCost)+Number(tax);
  

    return (
        <div>
        <h2>order Summery</h2>
        <h3>Items Ordered:{cart.length}</h3>
        <p>product price : {Total}</p>
        <p>shippingCost:{shippingCost}</p>
        <p>tax:{tax}</p>
        <p> total:{grand}</p>
       
        
        
        </div>
    );
};

export default Cart;