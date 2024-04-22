import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import Wishlist from "./components/store/Wishlist";
import { useAuthContext } from "./context/AuthContext";
import CartPage from "./pages/cart/cartPage";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Store from "./pages/store/Store";
import OrderInfo from "./pages/cart/OrderInfo";
import ForgotPassword from "./pages/forget/ForgotPassword";

function App() {
  const { authUser } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    document.title = "Anime 471 Streaming";
  }, []);

  return (
    <div>
      {authUser && <Navbar />}
      <div className="p-4 h-screen flex items-center justify-center ">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/chat"
            element={authUser ? <Chat /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/store"
            element={authUser ? <Store /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/store/cart"
            element={authUser ? <CartPage /> : <Navigate to={"/login"} />}
          />
          
          <Route
            path="/store/wishlist"
            element={authUser ? <Wishlist /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/dashboard"
            element={authUser ? <Dashboard /> : <Navigate to={"/login"} />}
          />
          <Route path='/forgot-password' element={authUser ? <Navigate to='/' /> : <ForgotPassword />} />
          <Route path='/pages/cart/orderinfo' element={authUser ? <OrderInfo /> : <Navigate to={"/login"} />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
