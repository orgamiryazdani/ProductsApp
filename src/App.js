import React from "react";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { store } from "./components/ProductsData/Store";
import NotFund from "./components/NotFund/NotFund";
import ProductsCard from "./common/ProductsCard";
import LikeCard from "./common/LikeCard";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<ProductsCard />} />
          <Route path="/Like-card" element={<LikeCard />} />
          <Route path="*" element={<NotFund />} />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
