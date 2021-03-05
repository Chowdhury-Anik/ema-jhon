import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


const Product = (props) => {
    //  console.log(props);
  const { img, name, seller, price, stock,key } = props.product;
  return (
    <div className="product">
      <div className="image-effect">
        <img src={img} alt="" />
      </div>
      <div className="mouse-effect">
        <h4 className="product-name"><Link to={"/product/category/"+key}>{name}</Link></h4>
        <br />
        <p>
          <small>By: {seller}</small>
        </p>
        <p>Price: ${price}</p>
        <p>
          <small>Only {stock} left in stock-order soon</small>
        </p>
        <br />
        { props.showAddToCart=== true && <button className="button-style"
        onClick={() => props.handleAddProduct(props.product)}

        >
          <FontAwesomeIcon icon={faShoppingCart}/>  add to cart</button>}
      </div>
    </div>
  );
};

export default Product;
