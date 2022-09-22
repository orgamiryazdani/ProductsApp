import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { filter, searchItem, sort } from '../common/ProductsData/ProductsSlice';
import { MdOutlineSort } from "react-icons/md";

const sortOptions = [
    { value: "", label: "select your option" },
    { value: "highest", label: "highest" },
    { value: "lowest", label: "lowest" },
];

const Filter = () => {

    const { pathname } = useLocation();
    const { categories } = useSelector((state) => state.categories);
    const [filterIcon, setFilterIcon] = useState(false);

    const { searchValue } = useSelector((state) => state.products);

    const sortRef = useRef('');
    const filterRef = useRef('');

    const sortHandler = () => {
        dispatch(searchItem(searchValue));
        dispatch(sort(sortRef.current.value));
    };

    const filterHandler = () => {
        dispatch(filter(filterRef.current.value));
        dispatch(sort(sortRef.current.value));
        dispatch(searchItem(searchValue));
    };

    const dispatch = useDispatch();

    return (
        <div className='filter'>
            <div className={filterIcon === true ? "selectFilterMobile" : "selectFilter"}>
                <label>sort by price</label>
                <select ref={sortRef} onChange={sortHandler} disabled={pathname === "/category" || pathname === "/like-card"}>
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value} placeholder="amir">{option.label}</option>
                    ))}
                </select>
                <label>filter by category</label>
                <select ref={filterRef} onChange={filterHandler} disabled={pathname === "/category" || pathname === "/like-card"}>
                    <option value="All">All</option>
                    {categories.map((option) => (
                        <option key={option.name} value={option.name}>{option.name}</option>
                    ))}
                </select>
            </div>
            <div className='sortIcon' onClick={() => setFilterIcon((filterIcon) => !filterIcon)}>
                <MdOutlineSort className='iconFilter' />
            </div>
        </div>

    );
}

export default Filter;