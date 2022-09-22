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
import NotFund from '../common/NotFund/NotFund';
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
        .required("Name is required")
        .min(3, "Name length is not valid"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    phoneNumber: Yup.string()
        .required("Phone Number is required")
        .matches(/^[0-9]{11}$/, "Invalid Phone Number")
        .nullable(),
    password: Yup.string().required("Password is required"),
    passwordConfirm: Yup.string()
        .required("Pasword Confirmation is Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
        <Layout>
            <div className='login'>
                <form onSubmit={formik.handleSubmit}>
                    <Input formik={formik} name="name" placeholder="name" />
                    <Input formik={formik} name="email" type="email" placeholder="email" />
                    <Input
                        formik={formik}
                        name="phoneNumber"
                        type="tel"
                        placeholder="phone number"
                    />
                    <Input
                        formik={formik}
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <Input
                        formik={formik}
                        name="passwordConfirm"
                        type="password"
                        placeholder="password confirm"
                    />
                    <div className="btnSgn">
                        <button
                            type="submit"
                            disabled={!formik.isValid}
                            className="btn"
                            style={!formik.isValid ? { color: "#555", border: "1px solid #555" } : null}
                        >
                            Signup
                        </button>
                        <br />
                        <p>PLEASE TURN ON VPN !</p>
                        {error && (
                            <span style={{ color: "red", marginTop: "10px" }}>{error}</span>
                        )}
                        <NavLink to={`/login?redirect=${redirect}`}>
                            <p style={{ marginTop: "15px" }}>Already login?</p>
                        </NavLink>
                    </div>
                </form>
            </div>
        </Layout >
    );
};

export default SignupForm;
