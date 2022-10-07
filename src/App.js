import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import NotFund from "./common/NotFund/NotFund";
import LikeCard from "./components/LikeCard";
import Category from "./components/Category";
import SingleProduct from "./components/SingleProduct";
import ProductsCategory from "./components/ProductsCategory";
import LoginForm from "./components/Login";
import SignupForm from "./components/Signup";
import { loginUser, setLoginUser } from "./common/ProductsData/UserSlice";
import Profile from "./components/Profile";
import { getAsyncCategories } from "./common/ProductsData/CategorySlice";
import ProductPage from "./page/ProductPage";

const App = () => {
  useEffect(() => {
    dispatch(getAsyncCategories("/categories"));
    const userData = JSON.parse(localStorage.getItem("user"));
    const userDataStorage = JSON.parse(localStorage.getItem("userDataStorage"));
    dispatch(loginUser(userDataStorage));
    dispatch(setLoginUser(userData));
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="products">
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/like-card" element={<LikeCard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/single-product/:id" element={<SingleProduct />} />
        <Route path="/products-category/:id" element={<ProductsCategory />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFund />} />
      </Routes>
    </div>
  );
};

export default App;
