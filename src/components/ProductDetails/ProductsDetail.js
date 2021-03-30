import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductsDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/product/' + productKey)
            .then(res => res.json())
            .then(data => setProduct(data))

    }, [productKey])

    // const product = fakeData.find(pd => pd.key === productKey);

    return (
        <div>

            <h2> Your product Details </h2>
            <Product showAddToCart={false} product={product}></Product>

        </div>
    );
};

export default ProductsDetail;