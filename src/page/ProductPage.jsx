import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../common/loading/Loading';
import NotFund from '../common/NotFund/NotFund';
import ProductsCard from "../common/ProductsCard";
import { addItemToCart } from '../common/ProductsData/LikeSlice';
import { getAsyncProducts } from "../common/ProductsData/ProductsSlice";

const ProductPage = () => {

    useEffect(() => {
        dispatch(getAsyncProducts(`/products`));
    }, []);

    const addItem = (product) => {
        dispatch(addItemToCart(product));
    }

    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <NotFund error={error} />
    }


    return (
        <>
            <ProductsCard
                products={products}
                addItem={addItem}
            />
        </>
    );
}

export default ProductPage;