import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Dashboard from "./pages/dashboard/Dashboard";
import Topbar from "./components/topbar/Topbar";

import Homepage from "./pages/homepage/Homepage";
import Write from "./pages/write/Write";
import Single from "./pages/single/Single";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";

function App() {
  const currentUser = false;
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    // getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
      <Topbar />
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/blogs" element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />

        {currentUser ? (
          <>
            <Route path="/register" element={<Homepage />} />
            <Route path="/login" element={<Homepage />} />
            <Route path="/write" element={<Write />} />
            <Route path="/settings" element={<Settings />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/write" element={<Login />} />
            <Route path="/settings" element={<Login />} />
          </>
        )}

        <Route path="/post/:id" element={<Single />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
