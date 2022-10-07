import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import Layout from '../Layout/Layout';
import image from "../../assets/img/images.jpg";
import { MdAdminPanelSettings } from "react-icons/md";

const Profile = () => {
    const { dataUser, user } = useSelector((state) => state.user);

    return (
        <Layout>
            <div className='profile'>
                {user ? <div>
                    <div className='imgUser'>
                        <img src={image} alt="image" />
                        <MdAdminPanelSettings className='isAdmin' style={dataUser.isAdmin === true ? { color: "#a4a402" } : { color: "#7e7e7e" }} />
                    </div>
                    <div className='aboutUser'>
                        <p>نام کاربری : {dataUser.name}</p>
                        <p>ایمیل : {dataUser.email}</p>
                        <p>شماره تلفن : {dataUser.phoneNumber}</p>
                    </div>
                </div> : <NavLink to="/login"><p>لطفا وارد شوید !</p></NavLink>}
            </div>
        </Layout>
    );
}

export default Profile;