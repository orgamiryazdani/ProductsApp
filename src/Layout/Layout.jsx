import React from 'react';
import { useDispatch } from 'react-redux';
import Filter from '../components/Filter';
import Menu from '../components/Menu';
import Search from '../components/Search';

const Layout = ({ children }) => {
    return (
        <>
            <Search />
            <Filter />
            <Menu />
            {children}
        </>
    );
};

export default Layout;