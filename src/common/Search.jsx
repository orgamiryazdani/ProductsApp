import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { GiBarbedSun } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { searchItem } from '../components/ProductsData/ProductsSlice';
import { useState } from 'react';

const Search = () => {

    const inputRef = useRef('')
    const dispatch = useDispatch();
    const [theme, setTheme] = useState(true);

    const changeHandler = () => {
        dispatch(searchItem(inputRef.current.value));
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
                <input className="" placeholder="Search in name ..." type="search" ref={inputRef} onChange={changeHandler} />
            </div>

            <div className='navFeature'>
                <div className='icons'>
                    <div>
                        <Link to="LikeCard">
                            <AiOutlineHeart className='likeIcon' />
                        </Link>
                    </div>
                    <div className='theme' onClick={handleModeChange}>
                        {theme ? <GiBarbedSun /> : <BsFillMoonStarsFill />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;