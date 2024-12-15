import React from "react";
import Section1 from "../Home Page/Section1";
import Section2 from "../Home Page/Section2";
import Section3 from "../Home Page/Section3";
import Section4 from "../Home Page/Section4";
import Section5 from "../Home Page/Section5";
import Section6 from "../Home Page/Section6";
import Footer from "../component/Footer";

function Home_Page() {
    return (
        <div className="flex flex-col">
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
