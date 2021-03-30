import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    //total price using reduce array function 
    // const totalPrice = cart.reduce((total,prod)=> total + prod.price, 0);
    //calculate total price using by loop

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;


    }
    let shipping = 0.00;
    if (total > 500) {
        shipping = 0.99;
    }

    else if (total > 100) {
        shipping = 12.99;
    }
    else if (total > 0) {
        shipping = 12.99
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    const productPrice = (total).toFixed(2);
    return (
        <div>
            <h4>Oder Summary</h4>
            <p>Items ordered: {cart.length}</p>
            <p>Product Price: {productPrice}</p>
            <p><small>Shipping: {shipping}</small></p>
            <p><small>Tax + Vat: {tax}</small></p>
            <p>Total Price:{grandTotal}</p>
            <br />

            {
                props.children
            }
        </div>
    );
};

export default Cart;