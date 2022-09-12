import React from "react";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { store } from "./components/ProductsData/Store";
import NotFund from "./components/NotFund/NotFund";
import ProductsCard from "./common/ProductsCard";
import LikeCard from "./common/LikeCard";
import Category from "./common/Category";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<ProductsCard />} />
          <Route path="/like-card" element={<LikeCard />} />
          <Route path="/category" element={<Category />} />
          <Route path="*" element={<NotFund />} />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
