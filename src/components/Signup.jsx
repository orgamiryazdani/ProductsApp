import React from 'react';
import Input from "../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "../hooks/useQuery";
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setLoginUser } from '../common/ProductsData/UserSlice';
import { useState } from 'react';
import axios from 'axios';
import Loading from '../common/loading/Loading';

const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
};

const validationSchema = Yup.object({
    name: Yup.string()
        .required("نام کاربری الزامی است")
        .min(3, "طول نام کاربری معتبر نیست"),
    email: Yup.string()
        .email("قالب ایمیل نامعتبر است")
        .required("ایمیل مورد نیاز است"),
    phoneNumber: Yup.string()
        .required("شماره تلفن الزامی است")
        .matches(/^[0-9]{11}$/, "شماره تلفن نامعتبر")
        .nullable(),
    password: Yup.string().required("رمز عبور مورد نیاز است"),
    passwordConfirm: Yup.string()
        .required("تایید رمز عبور الزامی است")
        .oneOf([Yup.ref("password"), null], "رمزهای عبور باید مطابقت داشته باشند"),
});

const SignupForm = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useSelector((state) => state.user);
    const query = useQuery();
    const redirect = query.get("redirect") || "/";
    const history = useNavigate();
    const dispatch = useDispatch()


    useEffect(() => {
        if (user) history(redirect);
    }, [redirect, user]);

    const onSubmit = async (values) => {
        const { name, email, phoneNumber, password } = values;
        const userData = {
            name,
            email,
            phoneNumber,
            password,
        };
        setLoading(true)
        try {
            const { data } = await axios.post("https://nodejs-post-app.herokuapp.com/api/user/register", userData);
            setLoading(false);
            dispatch(loginUser(data));
            dispatch(setLoginUser(true));
            localStorage.setItem("userDataStorage", JSON.stringify(data))
            localStorage.setItem("user", true)
            history(redirect);
        } catch (error) {
            setLoading(false);
            setError(error.message);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            }
        }

    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });

    if (loading) {
        return <Loading />
    }

    return (
            <div className='login'>
                <form onSubmit={formik.handleSubmit}>
                    <Input formik={formik} name="name" placeholder="نام کاربری" />
                    <Input formik={formik} name="email" type="email" placeholder="ایمیل" />
                    <Input
                        formik={formik}
                        name="phoneNumber"
                        type="tel"
                        placeholder="شماره تلفن"
                    />
                    <Input
                        formik={formik}
                        name="password"
                        type="password"
                        placeholder="کلمه عبور"
                    />
                    <Input
                        formik={formik}
                        name="passwordConfirm"
                        type="password"
                        placeholder="تکرار کلمه عبور"
                    />
                    <div className="btnSgn">
                        <button
                            type="submit"
                            disabled={!formik.isValid}
                            className="btn"
                            style={!formik.isValid ? { color: "#555", border: "1px solid #555" } : null}
                        >
                            ثبت نام
                        </button>
                        <br />
                        <p>لطفا vpn خود را روشن کنید !</p>
                        {error && (
                            <span style={{ color: "red", marginTop: "10px" }}>{error}</span>
                        )}
                        <NavLink to={`/login?redirect=${redirect}`}>
                            <p style={{ marginTop: "15px" }}>قبلا وارد شدید ؟</p>
                        </NavLink>
                    </div>
                </form>
            </div>
    );
};

export default SignupForm;
