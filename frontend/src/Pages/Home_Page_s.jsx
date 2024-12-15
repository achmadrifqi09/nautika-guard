// Home_Page.js
import React, { useState } from "react";
import Navbar_u from "../component/Navbar_u";
import Login from "./Login";
import SignUp from "./SignUp";

function Home_Page_s() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSignUpPage, setShowSignUpPage] = useState(false);

  // Show the Login page if the login state is set to true
  if (showLoginPage) {
    return (
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setShowLoginPage={setShowLoginPage}
        setShowSignUpPage={setShowSignUpPage}
      />
    );
  }

  // Show the SignUp page if the signup state is set to true
  if (showSignUpPage) {
    return (
      <SignUp
        setShowSignUpPage={setShowSignUpPage}
        setShowLoginPage={setShowLoginPage}
      />
    );
  }

  return (
    <div>
      <Navbar_u isLoggedIn={isLoggedIn} setShowLoginPage={setShowLoginPage} />
    </div>
  );
}

export default Home_Page_s;
