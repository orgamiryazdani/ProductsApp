import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { checkInCart } from "../utils/checkInCart";
import Carousel from 'react-elastic-carousel';
import Loading from "../common/loading/Loading";
import NotFund from "../common/NotFund/NotFund";
import { addItemToCart } from "../common/ProductsData/LikeSlice";
import { getAsyncProducts } from "../common/ProductsData/ProductsSlice";
import { useParams } from "react-router-dom";


const SingleProduct = () => {

    const { id } = useParams()

    const [theme, setTheme] = useState(true);

    useEffect(() => {
        const getTheme = localStorage.getItem('Theme');
        if (getTheme === 'dark') {
            setTheme(false);
            return document.body.classList.add('dark-mode');
        }
    }, [])

    useEffect(() => {
        dispatch(getAsyncProducts(`/products/${id}`));
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
        <>
            {
                products.map((product) => (
                    <div key={product.id} className="singlePage">
                        <div className="sliderSingleProducts">
                            <div className="like" onClick={() => addItem(product)}>
                                {checkInCart(LikeProduct, product) ? <AiFillHeart /> : <AiOutlineHeart />}
                            </div>
                            <div className="star">
                                <AiOutlineStar />
                                <p>4.95</p>
                            </div>
                            <Carousel itemsToShow={1}>
                                {product.images.map((img, index) => <img key={index} className="imgSingleProduct" src={img} alt='images' />)}
                            </Carousel>
                        </div>
                        <div className="Information">
                            <div>
                                <span>category </span>
                                <p>{product.category.name}</p>
                            </div>
                            <div>
                                <span>name </span>
                                <p>{product.title}</p>
                            </div>
                            <div>
                                <span>total </span>
                                <p>$ {product.price}</p>
                            </div>
                            <div>
                                <span>description </span>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default SingleProduct;