import React from "react";

const Section6 = () => {
  return (
    <section className="flex flex-col my-20">
      <div className="border-2 border-[#00609B] bg-gray-100 shadow-lg flex flex-col space-y-10 items-center p-16 mx-auto rounded-2xl">
        <div className="text-center">
          <p className="font-bold text-5xl mb-7 text-gray-600">
            Gabung sebagai relawan
          </p>
          <div className="text-gray-400">
            <p>
              Kesempatan bagi anda untuk mendaftarkan dan terlibat langsung
              dalam aksi pelestarian lingkungan
            </p>
            <p>
              sebagai relawan, anda dapat berpartisipasi dalam kegiatan seperti
              pembersihan perairan,
            </p>
            <p>kampanye edukasi, serta acara komunitas lainnya.</p>
          </div>
          <button className="mt-10 px-10 py-2 bg-[#00609B] rounded-xl text-white hover:bg-blue-700">
            Gabung sekarang
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section6;
