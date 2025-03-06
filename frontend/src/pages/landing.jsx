import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function LandingPage() {
  return (
    <>
      <div className="landingPageContainer">
        {/* Declaration of Navbar  */}
        <nav>
          <div className="navHeader">
            <h2>MeetCall.in</h2>
          </div>
          <div className="navList">
            <Link to="/Home">
              <p>Join as guest</p>
            </Link>
            <Link to="/auth">
              <p>Register</p>
            </Link>
            <div role="button">
              <Link to="/auth">
                {" "}
                <p> Login In </p>
              </Link>
            </div>
          </div>
        </nav>

        {/* Declaration of Main Image */}
        <div className="landingMainContainer">
          <div>
            <h1>
              <span style={{ color: "#FF9839" }}>Connect</span> with Yours Loved
              Ones
            </h1>
            <p>Cover Distance by MeetCall</p>
            <div role="button">
              <Link to="/auth">Get Started</Link>
            </div>
          </div>
          <div>
            <img src="/mobile.png" alt="mobileImage" />
          </div>
        </div>
      </div>
    </>
  );
}
