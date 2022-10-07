import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import NotFund from '../common/NotFund/NotFund';
import ProductsCard from '../common/ProductsCard';
import { addItemToCart } from '../common/ProductsData/LikeSlice';

const LikeCard = () => {

    const { LikeProduct } = useSelector((state) => state.like);
    const dispatch = useDispatch();

    const addItem = (product) => {
        dispatch(addItemToCart(product))
    }

    return (
        <>
            {LikeProduct.length >= 1 ?
                <ProductsCard
                    products={LikeProduct}
                    addItem={addItem}
                />
                :
                <NotFund error="محصولی در سبد خرید وجود ندارد !" />
            }
        </>

    );
}

export default LikeCard;
