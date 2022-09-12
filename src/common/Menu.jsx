import React from 'react';
import { RiHome6Line } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const { LikeProduct } = useSelector((state) => state.like);
    return (
        <menu>

            <NavLink className={({ isActive }) =>
                isActive ? "itemMenu" : ""
            } to="/">
                <div> <RiHome6Line /></div>
            </NavLink>

            <NavLink className={({ isActive }) =>
                isActive ? "itemMenu" : ""
            } to="/category">
                <div><BiCategoryAlt /></div>
            </NavLink>

            <NavLink className={({ isActive }) =>
                isActive ? "itemMenu" : ""
            } to="/like-card">
                <div className='likeIconMenu'>
                    {LikeProduct.length > 0 ? <p>{LikeProduct.length}</p> : null}
                    <AiOutlineHeart />
                </div>
            </NavLink>

            <NavLink className={({ isActive }) =>
                isActive ? "itemMenu" : ""
            } to="/amir">
                <div><CgLogOut /></div>
            </NavLink>

        </menu>
    );
}

export default Menu;