import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Loading from "../pages/Loading";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Account from "../pages/Account";
import Cart from "../pages/Cart";
import AdminPanel from "../pages/AdminPanel";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Stock from "../pages/Stock";
import Orders from "../pages/Orders";
import Users from "../pages/Users";
import Layout from "../components/Layout/index";
import SideNav from "../components/SideNav";
import UpdateAccount from "../pages/UpdateAccount";
import AddToStore from "../pages/AddToStore/index";
import ConfirmOrder from "../pages/ConfirmOrder";
import { useEffect, useState } from "react";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/update-account"
          element={
            <SideNav>
              <UpdateAccount />
            </SideNav>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminPanel"
          element={
            <Layout>
              <AdminPanel />
            </Layout>
          }
        />
        <Route
          path="/allProducts"
          element={
            <Layout>
              <AllProducts />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/account"
          element={
            <Layout>
              <Account />
            </Layout>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/stock"
          element={
            <SideNav>
              <Stock />
            </SideNav>
          }
        />
        <Route
          path="/orders"
          element={
            <SideNav>
              <Orders />
            </SideNav>
          }
        />
        <Route
          path="/users"
          element={
            <SideNav>
              <Users />
            </SideNav>
          }
        />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route
          path="/add-to-store"
          element={
            <SideNav>
              <AddToStore />
            </SideNav>
          }
        />
      </Routes>
    </Router>
  );
}
