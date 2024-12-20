import React from "react";
import {  useSelector } from 'react-redux';
import Section1 from "../Home Page/Section1";
import Section2 from "../Home Page/Section2";
import Section3 from "../Home Page/Section3";
import Section4 from "../Home Page/Section4";
import Section5 from "../Home Page/Section5";
import Section6 from "../Home Page/Section6";
import Footer from "../component/Footer";
import Navbar_u from "../component/Navbar_u";

function Home_Page() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <div className="flex flex-col">
            {!isAuthenticated && (<Navbar_u/>)}
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Footer/>
        </div>
    );
}

export default Home_Page;
