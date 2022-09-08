import React from 'react';
import Search from '../common/Search';

const Layout = ({ children }) => {
    return (
        <div className="products">
            <Search />
            {children}
        </div>
    );
};

export default Layout;