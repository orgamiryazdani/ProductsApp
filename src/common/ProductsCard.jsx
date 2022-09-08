import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { checkInCart } from "../utils/checkInCart";
import Carousel from 'react-elastic-carousel';
import Loading from "../components/loading/Loading";
import Layout from "../Layout/Layout";
import NotFund from "../components/NotFund/NotFund";
import { addItemToCart } from "../components/ProductsData/LikeSlice";
import { getAsyncProducts } from "../components/ProductsData/ProductsSlice";

const ProductsCard = () => {

    useEffect(() => {
        dispatch(getAsyncProducts());
    }, []);

    const { products, loading, error } = useSelector((state) => state.products);
    const { LikeProduct } = useSelector((state) => state.like);
    const dispatch = useDispatch();

    const addItem = (product) => {
        dispatch(addItemToCart(product))
    }

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <NotFund />
    }

    return (
        <Layout>
            <div className="product">
                {products.map((product) => (
                    <div className="cardProduct" key={product.id}>
                        <div className="imageCartProduct">
                            <Carousel className="Carousel" itemsToShow={1}>
                                {product.images.map((img, index) => <img key={index} className="img" src={img} alt='images' />)}
                            </Carousel>
                            <div className="topFeature">
                                <div className="like" onClick={() => addItem(product)}>
                                    {checkInCart(LikeProduct, product) ? <AiFillHeart /> : <AiOutlineHeart />}
                                </div>
                                <div className="star">
                                    <AiOutlineStar />
                                    <p>4.95</p>
                                </div>
                            </div>
                        </div>
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
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default ProductsCard;