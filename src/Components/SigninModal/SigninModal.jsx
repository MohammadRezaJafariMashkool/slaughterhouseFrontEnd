import React, { useState } from 'react';
import './SigninModal.css';
import CloseBtnIcon from '../../Assets/cart_cross_icon.png';

const SigninModal = () => {
  const [isSignInOrUp, setIsSignInOrUp] = useState("signup");
  const [isModalOpen, setIsModalOpen] = useState(true);

  // State for input values
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation rules
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleForm = () => {
    setIsSignInOrUp((prev) => (prev === "signup" ? "signin" : "signup"));
  };

  const handleSubmit = () => {
    if (isSignInOrUp === "signup") {
      if (!name || name.length > 50) {
        alert("Name is required and should be less than 50 characters.");
        return;
      }
      if (!emailRegex.test(email)) {
        alert("Enter a valid email.");
        return;
      }
      if (!phoneRegex.test(phone)) {
        alert("Enter a valid 10-digit phone number.");
        return;
      }
      if (address.length > 200) {
        alert("Address should not exceed 200 characters.");
        return;
      }
      if (!passwordRules.test(password)) {
        alert("Password should be at least 8 characters, contain an uppercase letter, a lowercase letter, and a number.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      alert("Signup Successful!");
    } else {
      if (!emailRegex.test(email) || !password) {
        alert("Enter valid email and password.");
        return;
      }
      alert("Signin Successful!");
    }
  };

  return (
    <div className="signinup-modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
      <div className="signinup-modal-overlay" onClick={closeModal}></div>
      <div className="signinup-modal-content">
          {isSignInOrUp === "signup" ? (
            <div className="signinup-container">
              <h2>{isSignInOrUp === "signup" ? "ثبتنام" : "ورود"}</h2>
              <input
                className="signinup-input"
                type="text"
                placeholder="نام: و نام خانوادگی"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength="50"
              />
              <input
                className="signinup-input"
                type="text"
                placeholder="شماره تلفن: "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                className="signinup-input-long"
                placeholder="آدرس: "
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength="300"
                rows="3"
              />
              <input
                className="signinup-input"
                type="email"
                placeholder="ایمیل: "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="signinup-input"
                type="password"
                placeholder="رمز عبور: "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="signinup-input"
                type="password"
                placeholder="تکرار رمز عبور: "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="submit-button" onClick={handleSubmit}>
                <p>ثبتنام</p>                
              </div>
              <p className="login-p" onClick={toggleForm}>
                قبلا ثبتنام کرده ام ورود
              </p>
            </div>
          ) : (
            <div className="signinup-container">
              <h2>{isSignInOrUp === "signup" ? "ثبتنام" : "ورود"}</h2>
              <input
                className="signinup-input-email"
                type="email"
                placeholder="ایمیل: "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="signinup-input-pass"
                type="password"
                placeholder="رمز عبور: "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="submit-button" onClick={handleSubmit}>
                ورود
              </button>
              <p className="forgetpass-p">فراموشی رمز عبور</p>
              <p className="login-p" onClick={toggleForm}>
                ثبتنام
              </p>
            </div>
          )}
      </div>
      <img src={CloseBtnIcon} className="signinup-modal-close-btn" onClick={closeModal} alt="Close" />
    </div>
  );
};

export default SigninModal;
