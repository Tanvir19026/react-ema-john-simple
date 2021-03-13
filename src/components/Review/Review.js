import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyEndings from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderplaced, setOrderplaced] = useState(false);
   
    const handlePlaceOrder=()=> {
        setCart([]);
        setOrderplaced(true);
        processOrder();

    }

    const removeProduct = (productKey) => {

        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }



    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);

    }, []);

    let EndEmoji;
    if(orderplaced)
    {
        EndEmoji =<img src={happyEndings} alt="" srcset=""/>

    }


    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItems removeProduct={removeProduct}
                        product={pd} key={pd.key}> </ReviewItems>)
                }
                {
                    EndEmoji
                }
            </div>
            <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handlePlaceOrder} className="main-btn">Place Order</button>
            </Cart>
    
            </div>

        </div>
    );
};

export default Review;