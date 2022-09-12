import React from 'react';
import Menu from '../common/Menu';
import Search from '../common/Search';

const Layout = ({ children }) => {
    return (
        <div className="products">
            <Search />
            <Menu />
            {children}
        </div>
    );
};

export default Layout;