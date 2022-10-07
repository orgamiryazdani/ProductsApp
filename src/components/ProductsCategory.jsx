import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAsyncProducts } from '../common/ProductsData/ProductsSlice';
import ProductsCard from '../common/ProductsCard';
import { addItemToCart } from '../common/ProductsData/LikeSlice';
import Loading from '../common/loading/Loading';
import NotFund from '../common/NotFund/NotFund';

const ProductsCategory = () => {

    const { id } = useParams();
    const { products, loading, error } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const addItem = (product) => {
        dispatch(addItemToCart(product));
    }

    useEffect(() => {
        dispatch(getAsyncProducts(`/categories/${id}/products`));
    }, []);

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

export default ProductsCategory;