import { createContext, React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import BottomToTopBtn from "./components/Common/BottomToTopBtn/BottomToTopBtn";
import Footer from "./components/Common/Footer/Footer/Footer";
import HomeContainer from "./components/pages/Home/HomeContainer/HomeContainer";
import OurClass from "./components/pages/OurClass/OurClass";
import Pricing from "./components/pages/Pricing/Pricing/Pricing";
import ClassDetail from "./components/pages/ClassDetail/ClassDetail";
import AboutUs from "./components/pages/AboutUs/AboutUs/AboutUs";
import UserData from "./components/pages/Checkout/UserData/UserData/UserData";
import NotSelected from "./components/pages/Checkout/NotSelected/NotSelected";
import Contact from "./components/pages/ContactUs/Contact/Contact";
import PaymentContainer from "./components/pages/Checkout/Payment/PaymentContainer/PaymentContainer";
import MemberCreated from "./components/pages/Checkout/MemberCreated/MemberCreated";

import NotFound from "./components/pages/NotFound/NotFound";

export const UserContext = createContext();

function App() {
  const [cart, setCart] = useState(true);
  const [userDetail, setUserDetail] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(true);

  useEffect(()=> {
    const cartItem = JSON.parse(sessionStorage.getItem("cart"));
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));

    if( cartItem ) {
      setCart(cartItem);
    }

    if( userData ) {
      setUserDetail(userData);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        cart,
        setCart,
        userDetail,
        setUserDetail,
        paymentSuccess,
				setPaymentSuccess,
      }}
    >
        <main className="App">
          <BottomToTopBtn />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/home" element={<HomeContainer />} />
              <Route path="/classes" element={<OurClass />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/class/:classId" element={<ClassDetail />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout/register" element={cart ? <UserData /> : <NotSelected />} />
              <Route path="/checkout/payment" element={cart && userDetail ? <PaymentContainer /> : <NotSelected />} />
              <Route path="/checkout/memberCreated" element={cart && userDetail && paymentSuccess ? (
                <MemberCreated />
              ) : (
                <NotSelected />
              )} />
              <Route path="*" element={<NotFound />} />              
            </Routes>
            <Footer />
          </BrowserRouter>
        </main>
    </UserContext.Provider>
  );
}

export default App;
