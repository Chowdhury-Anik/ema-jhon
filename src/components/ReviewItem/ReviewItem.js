import React from 'react';

const ReviewItem = (props) => {
    //console.log(props);
    const {name, quantity, key, price} = props.product;
    const reviewItemsStyle ={
        borderBottom: '1px solid gray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'

    };
    
    return (
        <div style={reviewItemsStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p><small>Price: ${price}</small></p>
            <p>Quantity: {quantity}</p>

            <br/>
            <button className="button-style"
            onClick={()=>props.removeProduct(key)}
            
            >Remove item</button>
        </div>
    );
};

export default ReviewItem;