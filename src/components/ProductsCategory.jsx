import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from "../common/loading/Loading";
import NotFund from "../common/NotFund/NotFund";
import { getAsyncProducts } from '../common/ProductsData/ProductsSlice';
import Layout from '../Layout/Layout';
import { checkInCart } from "../utils/checkInCart";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Carousel from 'react-elastic-carousel';
import { addItemToCart } from '../common/ProductsData/LikeSlice';

const ProductsCategory = () => {

    const { id } = useParams();
    const { products, loading, error } = useSelector((state) => state.products);
    const { LikeProduct } = useSelector((state) => state.like);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsyncProducts(`/categories/${id}/products`));
    }, []);

    const addItem = (product) => {
        dispatch(addItemToCart(product))
    }


    if (loading) {
        return <Loading />
    }

    if (error) {
        return <NotFund error={error}/>
    }

    return (
        <Layout>
            <div className="product">
                {products.map((product) => (
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
                ))}
            </div>
        </Layout>
    );
}

export default ProductsCategory;