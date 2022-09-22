import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { checkInCart } from "../utils/checkInCart";
import Carousel from 'react-elastic-carousel';
import Loading from "../common/loading/Loading";
import NotFund from "../common/NotFund/NotFund";
import Layout from "../Layout/Layout";
import { addItemToCart } from "../common/ProductsData/LikeSlice";
import { getAsyncProducts } from "./ProductsData/ProductsSlice";
import { NavLink } from "react-router-dom";

const ProductsCard = () => {

    useEffect(() => {
        dispatch(getAsyncProducts(`/products`));
    }, []);

    const { products, loading, error } = useSelector((state) => state.products);
    const { LikeProduct } = useSelector((state) => state.like);
    const dispatch = useDispatch();

    const addItem = (product) => {
        dispatch(addItemToCart(product));
    }

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <NotFund error={error} />
    }

    return (
        <Layout>
            <div className="product">
                {products.map((product) => (
                    <div key={product.id} className="cardProduct" >
                        <div className="imageCartProduct">
                            <div className="like" onClick={() => addItem(product)}>
                                {checkInCart(LikeProduct, product) ? <AiFillHeart /> : <AiOutlineHeart />}
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
                                        $ {product.price} <span>total</span>
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