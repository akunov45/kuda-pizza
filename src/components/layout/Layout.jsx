import Header from "./header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./footer/Footer.jsx";
import LoginModal from "../login-modal/LoginModal.jsx";
import {useState} from "react";
import SMSModal from "../sms-modal/SMSModal.jsx";

const Layout = () => {
  const [showModal, setShowModal] = useState('');
  const [otp, setOtp] = useState("")
  // login | sms | password
  const signIn = async () => {
    setShowModal('sms')
    const phoneData = {
      phone_number: "+996707422917"
    }
    const response = await fetch("https://my-test-product.up.railway.app/api-auth/register/", {
      method: "POST",
      body: JSON.stringify(phoneData),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const userData = await response.json();
    setOtp(userData.otp)
    // otp
    console.log(userData);
  }

  return (
      <div>
        <Header setShowModal={setShowModal}/>
        <Outlet/>
        {showModal === 'login' ? <LoginModal signIn={signIn} setShowModal={setShowModal}/> : null }
        {showModal === 'sms' ? <SMSModal otp={otp} setShowModal={setShowModal}/> : null }
        {/*{showModal === 'password' ? <PasswordModal setShowModal={setShowModal}/> : null }*/}
        <Footer/>
      </div>
  );
};

export default Layout;