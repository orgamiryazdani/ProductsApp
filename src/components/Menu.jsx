import React from 'react';
import { RiHome6Line } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginUser, setLoginUser } from '../common/ProductsData/UserSlice';

const Menu = () => {
    const { user } = useSelector((state) => state.user);
    const { LikeProduct } = useSelector((state) => state.like);
    const logOut = () => {
        if (user) {
            const confirmed = confirm("آیا می خواهید از سیستم خارج شوید ؟");
            if (confirmed) {
                localStorage.removeItem("userDataStorage");
                localStorage.removeItem("user");
                dispatch(setLoginUser(false));
                dispatch(loginUser());
            }
        } else {
            alert("شما وارد حساب کاربری خود نشده اید");
        }
    }
    const dispatch = useDispatch();
    return (
        <menu>
            <NavLink className={({ isActive }) =>
                isActive ? "showItemMenu itemMenu fixStyleMenuOptions" : "showItemMenu fixStyleMenuOptions"
            } to="/">
                <RiHome6Line />
                <div className='nameItemMenu'>محصولات</div>
            </NavLink>

            <NavLink className={({ isActive }) =>
                isActive ? "showItemMenu itemMenu fixStyleMenuOptions" : "showItemMenu fixStyleMenuOptions"
            } to="/category">
                <BiCategoryAlt />
                <div className='nameItemMenu'>دسته بندی</div>
            </NavLink>

            <NavLink className={({ isActive }) =>
                isActive ? "showItemMenu itemMenu fixStyleMenuOptions" : "showItemMenu fixStyleMenuOptions"
            } to="/like-card">
                <div className='likeIconMenu'>
                    {LikeProduct.length > 0 ? <p>{LikeProduct.length}</p> : null}
                    <AiOutlineShoppingCart />
                    <div className='nameItemMenu'>سبد خرید</div>
                </div>
            </NavLink>

            <div className='logOut showItemMenu fixStyleMenuOptions' onClick={logOut}>
                <CgLogOut />
                <div className='nameItemMenu'>خروج از حساب کاربری</div>
            </div>

        </menu>
    );
}

export default Menu;