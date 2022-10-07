import React from 'react';
import Input from "../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "../hooks/useQuery";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setLoginUser } from '../common/ProductsData/UserSlice';
import Loading from '../common/loading/Loading';
import axios from 'axios';
import { useState } from 'react';

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("ایمیل مورد نیاز است"),
  password: Yup.string().required("رمز عبور مورد نیاز است"),
});

const LoginForm = () => {

  const history = useNavigate();

  const { user, dataUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  const redirect = query.get("redirect") || "/";

  useEffect(() => {
    if (user) history(redirect);
  }, [redirect, user]);

  useEffect(() => {

  }, [dataUser]);

  const onSubmit = async (values) => {
    setLoading(true)
    try {
      const { data } = await axios.post("https://nodejs-post-app.herokuapp.com/api/user/login", values);
      setLoading(false)
      dispatch(loginUser(data));
      dispatch(setLoginUser(true));
      localStorage.setItem("userDataStorage", JSON.stringify(data))
      localStorage.setItem("user", true)
      history(redirect);
    } catch (error) {
      setLoading(false)
      setError(error.message);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }

    if (user) {
      history(redirect);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  if (loading === true) {
    return <Loading />
  }

  return (
      <div className="login">
        <form onSubmit={formik.handleSubmit}>
          <Input formik={formik} placeholder="نام کاربری" name="email" type="email" />
          <Input
            formik={formik}
            name="password"
            type="password"
            placeholder="کلمه عبور"
          />
          <div className="btnSgn">

            <button
              type="submit"
              disabled={!formik.isValid}
              className="btn"
              style={!formik.isValid ? { color: "#555", border: "1px solid #555" } : null}
            >
              ورود
            </button>
            <br />
            <p>لطفا vpn خود را روشن کنید !</p>
            {error && (
              <span style={{ color: "red", marginTop: "10px" }}>{error}</span>
            )}
            <NavLink to={`/signup?redirect=${redirect}`}>
              <p style={{ marginTop: "15px" }}>هنوز ثبت نام نکرده اید ؟</p>
            </NavLink>
          </div>
        </form>
      </div>
  );
};

export default LoginForm;
