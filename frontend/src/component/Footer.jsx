import React from "react";

    const Footer = () => {
    return (
        <footer className="border-t-2 mx-10 py-4 flex items-center justify-center text-center">
        <div className="flex text-gray-500 items-center space-x-2">
            <span className="text-xl">&copy;</span>
            <p>
            Copyright <span>{new Date().getFullYear()}</span>. All rights
            reserved.
            </p>
        </div>
        </footer>
    );
    };

export default Footer;
