import React, { useState } from "react";
import image1 from "../assets/01.png";
import image2 from "../assets/02.png";
import image3 from "../assets/03.png";
import image4 from "../assets/04.png";
import Donasi from "../Pages/Donasi";
import Newevent from "../Pages/Newevent";


const Section1 = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === "home" && (
        <section className="flex flex-col justify-between py-10 bg-image">
          <div className="flex flex-col items-center gap-5 my-5">
            <h2 className="text-5xl font-bold text-gray-800">
              Bersama Jaga Masa Depan
            </h2>
            <h2 className="text-5xl font-bold text-gray-800">
              dengan <span className="text-[#00609B]">NautikaGuard</span>
            </h2>
            <p className="text-base text-gray-500">
              "Air yang bersih adalah kunci untuk masa depan yang lebih baik. Mari
              lindungi ekosistem kita bersama"
            </p>
            <div className="flex justify-center rounded-2xl bg-white p-1 max-w-max mx-auto hover:scale-105 hover:shadow-lg transition-transform duration-500 ease-in-out">
              <div className="flex flex-wrap gap-1">
                <img src={image1} alt="image1" />
                <img src={image2} alt="image2" />
                <img src={image3} alt="image3" />
                <img src={image4} alt="image4" />
              </div>
            </div>
            <div className="flex flex-wrap my-10 gap-10">
              <button
                onClick={() => handleNavigation("Newevent")}
                className="px-20 py-4 font-medium text-white bg-[#00609B] rounded-lg hover:bg-blue-600"
              >
                Gabung Relawan
              </button>
              <button
                onClick={() => handleNavigation("Donasi")}
                className="px-20 py-4 font-medium text-white bg-[#00609B] rounded-lg hover:bg-blue-600"
              >
                Donasi Sekarang
              </button>
            </div>
          </div>
        </section>
      )}
      {currentPage === "Donasi" && <Donasi/>}
      {currentPage === "Newevent" && <Newevent/>}
    </>
  );
};

export default Section1;
