import { useSelector } from "react-redux";
import React from 'react';
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { checkInCart } from "../utils/checkInCart";
import Carousel from 'react-elastic-carousel';
import Layout from "../Layout/Layout";
import { NavLink } from "react-router-dom";

const ProductsCard = ({ products, addItem }) => {

    const { LikeProduct } = useSelector((state) => state.like);

    return (
        <Layout>
            <div className="product">
                {products.map((product) => (
                    <div key={product.id} className="cardProduct" >
                        <div className="imageCartProduct">
                            <div className="like" onClick={() => addItem(product)}>
                                {checkInCart(LikeProduct, product) ? <BsFillCartCheckFill /> : <AiOutlineShoppingCart />}
                            </div>
                            <div className="star">
                                <AiOutlineStar />
                                <p>4.95</p>
                            </div>
                            <Carousel className="Carousel" itemsToShow={1}>
                                {product.images.map((img, index) => <NavLink key={index} to={`/single-product/${product.id}`} ><img className="img" src={img} alt='images' /></NavLink>)}
                            </Carousel>

                        </div>
                        <NavLink to={`/single-product/${product.id}`}>
                            <div className="titlePrice">
                                <div>
                                    <p>
                                        {product.category.name}
                                    </p>
                                    <span>
                                        {product.title}
                                    </span>
                                </div>
                                <div>
                                    <p>
                                        $ {product.price} <span>قیمت</span>
                                    </p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default ProductsCard;