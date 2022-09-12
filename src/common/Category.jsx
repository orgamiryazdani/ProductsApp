import Layout from "../Layout/Layout";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAsyncCategories } from "../components/ProductsData/CategorySlice";
import NotFund from "../components/NotFund/NotFund";
import Loading from "../components/loading/Loading";

const Category = () => {
    
    const { categories, loading, error } = useSelector((state) => state.categories);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAsyncCategories());
    }, []);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <NotFund />
    }

    return (
        <Layout>
            <div className="product">
                {categories.map((product) => (
                    <div className="cardProduct" key={product.id}>
                        <div className="imageCartProduct">
                            <img className="img" src={product.image} alt='images' />
                        </div>
                        <div className="titlePrice">
                            <div>
                                <p>
                                    {product.name}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>

    );
}

export default Category;