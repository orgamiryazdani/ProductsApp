import React from 'react';
import Layout from '../../Layout/Layout';
import { useSelector } from "react-redux";

const NotFund = () => {
    const { error } = useSelector((state) => state.products);
    return (
        <Layout>
            <div className='notFund'>
                {error ? error : "not fund"}

            </div>
        </Layout>
    );
}

export default NotFund;