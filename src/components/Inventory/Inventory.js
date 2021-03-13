import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Inventory = () => {
    const  {productKey}=useParams();
    
    return (
        <div>
            <h1>This is Inventory !</h1>
           
        </div>
    );
};

export default Inventory;