import React from 'react';
import { RiHome6Line } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginUser, setLoginUser } from '../common/ProductsData/UserSlice';

const Menu = () => {
    const { user } = useSelector((state) => state.user);
    const { LikeProduct } = useSelector((state) => state.like);
    const logOut = () => {
        if (user) {
            const confirmed = confirm("Do you want to log out ?");
            if (confirmed) {
                localStorage.removeItem("userDataStorage");
                localStorage.removeItem("user");
                dispatch(setLoginUser(false));
                dispatch(loginUser());
            }
        } else {
            alert("You are not logged into your account");
        }
    }
    const dispatch = useDispatch();
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


            <div className='logOut' onClick={logOut}><CgLogOut /></div>

        </menu>
    );
}

export default Menu;