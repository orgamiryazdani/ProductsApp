import React, { useEffect, useRef } from 'react';
import { FiSearch } from "react-icons/fi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { GiBarbedSun } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { searchItem, setValueSearch } from '../common/ProductsData/ProductsSlice';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { searchCategory } from '../common/ProductsData/CategorySlice';
import { searchItemLike } from '../common/ProductsData/LikeSlice';
import image from "../../assets/img/images.jpg";

const Search = () => {

    const { pathname } = useLocation();
    const inputRef = useRef('');
    const dispatch = useDispatch();
    const [theme, setTheme] = useState(true);
    const { user } = useSelector((state) => state.user);

    const changeHandler = () => {
        dispatch(setValueSearch(inputRef.current.value));
        {
            pathname === "/category" ? dispatch(searchCategory(inputRef.current.value)) :
                pathname === "/like-card" ? dispatch(searchItemLike(inputRef.current.value)) :
                    dispatch(searchItem(inputRef.current.value));
        }
    };

    const handleModeChange = () => {
        setTheme((theme) => !theme)
        if (theme) {
            localStorage.setItem('Theme', 'dark');
            document.body.classList.add('dark-mode');
        } else {
            localStorage.setItem('Theme', 'light');
            document.body.classList.remove('dark-mode');
        }
    }

    useEffect(() => {
        const getTheme = localStorage.getItem('Theme');
        if (getTheme === 'dark') {
            setTheme(false);
            return document.body.classList.add('dark-mode');
        }
    }, [])

    return (
        <div className="search">
            <div className='searchBar'>
                <FiSearch />
                <input className="searchInput" placeholder="جستجو ..." type="search" ref={inputRef} onChange={changeHandler} />
            </div>

            <div className='navFeature'>
                <div className='icons'>
                    <NavLink className="signUp" to={user === true ? "/profile" : "/login"}>
                        <div>
                            {user === true ? <img src={image} alt="" /> : <p>ورود</p>}
                        </div>
                    </NavLink>
                    <div className='theme' onClick={handleModeChange}>
                        {theme ? <GiBarbedSun /> : <BsFillMoonStarsFill />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;