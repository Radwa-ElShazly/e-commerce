import React, { useEffect,useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import CartContextPro, {
  cartContextProduct,
} from "../../Context/CartContextPro";
import { authContext } from "../../Context/AuthContext";

export default function Layout() {
  const { myToken, setToken } = useContext(authContext);

  useEffect(() => {
    if (localStorage.getItem("tkn")) {
      setToken(localStorage.getItem("tkn"));
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
