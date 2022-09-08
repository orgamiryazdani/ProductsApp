import React from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Carousel from 'react-elastic-carousel';
import { checkInCart } from "../utils/checkInCart";
import { useDispatch } from "react-redux";
import { addItemToCart } from '../components/ProductsData/LikeSlice';

const LikeCard = () => {
    const { LikeProduct } = useSelector((state) => state.like);
    const dispatch = useDispatch();

    const addItem = (product) => {
        dispatch(addItemToCart(product))
    }

    return (
        <div className='likeCarts'>
            <div className="product">
                {LikeProduct.map((product) => (
                    <div className="cardProduct" key={product.id}>
                        <div className="imageCartProduct">
                            <Carousel className="Carousel" itemsToShow={1}>
                                {product.images.map(img => <img key={img.id} className="img" src={img} alt='images' />)}
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
        </div>
    );
}

export default LikeCard;