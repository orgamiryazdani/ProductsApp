import Layout from "../Layout/Layout";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Loading from "../common/loading/Loading";
import NotFund from "../common/NotFund/NotFund";
import { NavLink } from "react-router-dom";
import { getAsyncCategories } from "../common/ProductsData/CategorySlice";

const Category = () => {

    const { categories, loading, error } = useSelector((state) => state.categories);
    useEffect(() => {
        dispatch(getAsyncCategories("/categories"));
    }, []);

    const dispatch = useDispatch();
    if (loading) {
        return <Loading />
    }

    if (error) {
        return <NotFund error={error} />
    }

    return (
        <Layout>
            <div className="category">
                {categories.map((product) => (
                    <NavLink className="cardProduct" key={product.id} to={`/products-category/${product.id}`}>
                        <div >
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
                    </NavLink>
                ))}
            </div>
        </Layout>

    );
}

export default Category;