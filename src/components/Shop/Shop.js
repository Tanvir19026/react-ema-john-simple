import React from 'react'
import fakeData from '../../fakeData';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);

    const [products, setProducts] = useState(first10);
    const [cart, setcart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        //  console.log(savedCart);
        const productKey = Object.keys(savedCart);
        const cardProduct = productKey.map(elementkey => {
            const product = fakeData.find(key => key.key === elementkey);
            product.quantity = savedCart[elementkey];
            return product;

        })
        setcart(cardProduct);

    }, [])





    //   NaN atkanir method
    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setcart(newCart);
        addToDatabaseCart(product.key, count);

    }





    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product key={pd.key} ShowAddToCart={true} product={pd} handleAddProduct={handleAddProduct}></Product>)
                }

            </div>


            <div className="cart-container">
                <Cart cart={cart}>

                    <Link to="/Order">
                        <button className="main-btn">Review Order</button>
                    </Link>
                </Cart>



            </div>

        </div>
    )
}

export default Shop


