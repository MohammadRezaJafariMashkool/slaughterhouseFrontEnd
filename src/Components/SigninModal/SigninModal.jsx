import React, { useState } from 'react';
import './SigninModal.css';
import CloseBtnIcon from '../../Assets/cart_cross_icon.png';
import { BackendUrl } from '../../Constants/userConstants';

const SigninModal = () => {
  const [isSignInOrUp, setIsSignInOrUp] = useState("signup");
  const [isModalOpen, setIsModalOpen] = useState(true);

  // State for input values
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation rules
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{12}$/;
  const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleForm = () => {
    setIsSignInOrUp((prev) => (prev === "signup" ? "signin" : "signup"));
  };

  const handleSubmit = async () => {
    if (isSignInOrUp === "signup") {
      if (!name || name.length > 50) {
        alert("لطفان نام و نام خانوادگی را وارد کنید و نام و نام خانوادگی شما نباید بیشتر از 50 حرف باشد.");
        return;
      }
      if (!emailRegex.test(email)) {
        alert("آدرس ایمیل شما اشتباه است.");
        return;
      }
      if (!phoneRegex.test(tel)) {
        alert("شماره تلفن اشتباه است.");
        return;
      }
      if (address.length > 300) {
        alert("آدرس نباید بشتر از 300 حرف باشد.");
        return;
      }
      if (!passwordRules.test(password)) {
        alert("رمز عبور باید حداقل 8 کاراکتر داشته باشد، حدقل یک حرف بزگ، یک حرف کوچک و یک عدد باشد.");
        return;
      }
      if (password !== confirmPassword) {
        alert("رمز عبور وارد شده با رمز عبور مجددا وارد شده مغایر است.");
        return;
      }
      await signup();
    } else {
      if (!emailRegex.test(email) || !password) {
        alert("لطفا آدرس ایمیل و کلمه عبور درست وارد کنید.");
        return;
      }
      await login();
    }
  };

  const login = async () => {
    const formData = { email, password };
    let responseData;
    try {
      const response = await fetch(`${BackendUrl}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('user-name', responseData.user.name);
        localStorage.setItem('user-address', responseData.user.address);
        localStorage.setItem('user-tel', responseData.user.tel);
        localStorage.setItem('user-email', responseData.user.email);
        localStorage.setItem('user-role', responseData.user.role);
        window.location.replace("/");
      } else {
        alert("کلمه عبور یا ایمیل یا تلفن اشتباه است!");
      }
    } catch (error) {
      alert("اشتباهی رخ داده لطفا دوباره تلاش کنید.");
    }
  };

  const signup = async () => {
    const formData = { name, tel, email, address, password, confirmPassword };
    let responseData;
    try {
      const response = await fetch(`${BackendUrl}/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('user-name', responseData.user.name);
        localStorage.setItem('user-address', responseData.user.address);
        localStorage.setItem('user-tel', responseData.user.tel);
        localStorage.setItem('user-email', responseData.user.email);
        localStorage.setItem('user-role', responseData.user.role);
        window.location.replace("/");
      } else if (responseData.error && responseData.error.code === 11000) {
        alert("شما قبلا ثبتنام کرده اید لطفا اگر رمز خود را فراموش کرده اید از گزینه فراموشی رمز عبور استفاده کنید!");
      } else {
        alert(responseData.errMessage || "خطایی رخ داده لطفا دوباره تلاش کنید.");
      }
    } catch (error) {
      alert("خطایی رخ داده لطفا دوباره تلاش کنید.");
    }
  };

  const forgetPassClickHandler = async () => {
    const formData = { email };
    let responseData;
    try {
      const response = await fetch(`${BackendUrl}/password/forgot`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      responseData = await response.json();

      if (responseData.success) {
        alert(responseData.message);
      } else {
        alert("ایمیل شما اشتباه است!");
      }
    } catch (error) {
      alert("خطایی رخ داده دوباره تلاش کنید.");
    }
  };

  return (
    <div className="signinup-modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
      <div className="signinup-modal-overlay" onClick={closeModal}></div>
      <div className="signinup-modal-content">
        {isSignInOrUp === "signup" ? (
          <div className="signinup-container">
            <h2>ثبتنام</h2>
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
              value={tel}
              onChange={(e) => setTel(e.target.value)}
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
            <h2>ورود</h2>
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
            <p className="forgetpass-p" onClick={forgetPassClickHandler}>
              فراموشی رمز عبور
            </p>
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
