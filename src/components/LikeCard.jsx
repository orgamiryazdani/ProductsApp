import React from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Carousel from 'react-elastic-carousel';
import { checkInCart } from "../utils/checkInCart";
import { useDispatch } from "react-redux";
import Layout from "../Layout/Layout";
import { NavLink } from 'react-router-dom';
import { addItemToCart } from '../common/ProductsData/LikeSlice';

const LikeCard = () => {

    const { LikeProduct } = useSelector((state) => state.like);
    const dispatch = useDispatch();

    const addItem = (product) => {
        dispatch(addItemToCart(product))
    }

    return (
        <Layout>
            <>
                <div className="product">
                    {LikeProduct.length >= 1 ? LikeProduct.map((product) => (
                        <div className="cardProduct" key={product.id}>
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
                    )) : <div className='notLikeItem'>You have not liked any items !</div>}
                </div>
            </>
        </Layout>
    );
}

export default LikeCard;