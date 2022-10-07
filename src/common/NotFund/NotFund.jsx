import React from 'react';
import Layout from '../../Layout/Layout';

const NotFund = ({error}) => {
    
    return (
        <Layout>
            <div className='notFund'>
                {error ? error : "صفحه مورد نظر پیدا نشد"}
            </div>
        </Layout>
    );
}

export default NotFund;