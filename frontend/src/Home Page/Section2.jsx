import React from "react";
import event1 from "../assets/event-1.png";
import event2 from "../assets/event-2.png";
import event3 from "../assets/event-3.png";

const Section2 = () => {
  return (
    <section className="flex flex-col justify-between py-3">
      <div className="flex flex-col items-center gap-5 my-5">
        <div className="text-center mt-6 mb-10 space-y-4">
          <h2 className="text-5xl font-bold text-gray-600">
            Event yang Tersedia
          </h2>
          <p className="text-gray-400">
            
          </p>
        </div>
      </div>
      <div
        id="eventCard"
        className="grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-full mx-10"
      >
        <div className="bg-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-500 ease-in-out">
          <div className="relative w-full">
            <img src={event1} alt="event-1" className="w-full rounded-lg" />
            <div className="absolute left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex items-center justify-between py-3 px-2 rounded-3xl bg-yellow-100 w-full z-10">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                <div className="w-5 h-5 bg-pink-500 rounded-full"></div>
                <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
              </div>
              <p className="text-xs font-medium text-gray-700">
                + 32 orang telah bergabung
              </p>
            </div>
          </div>
          <div className="justify-around mt-8 px-1 max-w-full mx-auto">
            <div className="flex flex-wrap items-center gap-1">
              <div className="bg-yellow-100 px-5 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Event</p>
              </div>
              <div className="bg-yellow-100 px-7 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Lingkungan</p>
              </div>
              <div className="bg-yellow-100 px-7 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Relawan</p>
              </div>
            </div>
          </div>

          <div className="my-5 px-4">
            <div className="space-y-2 min-height-container">
              <p className="text-xs text-gray-600">
                Event Diselenggarakan: Selasa, 22 Oktober 2024
              </p>
              <h3 className="text-xl font-bold text-teal-700">
                Peduli Pantai Kenjeran, Kenjeran, Jawa Timur
              </h3>
              <div className="mt-2 max-h-48">
                <p className="text-xs text-gray-600 max-height-ellipsis">
                  Dalam rangka menjaga kelestarian lingkungan dan keindahan
                  Pantai Kenjeran, kami mengundang Anda untuk berpartisipasi
                  dalam kegiatan bersih-bersih pantai. Bersama-sama, kita akan
                  mengumpulkan sampah, membersihkan pasir, dan mengembalikan
                  keindahan alam Pantai Kenjeran.
                </p>
              </div>
            </div>
            <div className="flex mt-5 space-x-4">
              <button className="w-full px-3 py-2 text-sm text-white bg-[#00609B] rounded-lg hover:bg-blue-600">
                GABUNG
              </button>
              <button className="w-full px-3 py-2 text-sm text-white bg-[#00609B] rounded-lg hover:bg-blue-600">
                DONASI
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-500 ease-in-out">
          <div className="relative w-full">
            <img src={event2} alt="event-2" className="w-full rounded-lg" />
            <div className="absolute left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex items-center justify-between py-3 px-2 rounded-3xl bg-yellow-100 w-full z-10">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                <div className="w-5 h-5 bg-pink-500 rounded-full"></div>
                <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
              </div>
              <p className="text-xs font-medium text-gray-700">
                + 32 orang telah bergabung
              </p>
            </div>
          </div>
          <div className="justify-around mt-8 px-1 max-w-full mx-auto">
            <div className="flex flex-wrap items-center gap-1">
              <div className="bg-yellow-100 px-5 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Event</p>
              </div>
              <div className="bg-yellow-100 px-7 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Lingkungan</p>
              </div>
              <div className="bg-yellow-100 px-7 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Relawan</p>
              </div>
            </div>
          </div>

          <div className="my-5 px-4">
            <div className="space-y-2 min-height-container">
              <p className="text-xs text-gray-600">
                Event Diselenggarakan: Selasa, 22 Oktober 2024
              </p>
              <h3 className="text-xl font-bold text-teal-700">
                Sungai Cinambo, Bandung, Jawa Barat
              </h3>
              <div className="mt-2 max-h-48">
                <p className="text-xs text-gray-600 max-height-ellipsis">
                  #AksiBersihCinambo - Aksi Bersih Cinambo bertujuan untuk
                  mengurangi pencemaran sungai, melindungi ekosistem, dan
                  mencegah dampak buruk bagi kesehatan serta risiko banjir di
                  sekitar wilayah.
                </p>
              </div>
            </div>
            <div className="flex mt-5 space-x-4">
              <button className="w-full px-3 py-2 text-sm text-white bg-[#00609B] rounded-lg hover:bg-blue-600">
                GABUNG
              </button>
              <button className="w-full px-3 py-2 text-sm text-white bg-[#00609B] rounded-lg hover:bg-blue-600">
                DONASI
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-500 ease-in-out">
          <div className="relative w-full">
            <img src={event3} alt="event-3" className="w-full rounded-lg" />
            <div className="absolute left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex items-center justify-between py-3 px-2 rounded-3xl bg-yellow-100 w-full z-10">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                <div className="w-5 h-5 bg-pink-500 rounded-full"></div>
                <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
              </div>
              <p className="text-xs font-medium text-gray-700">
                + 32 orang telah bergabung
              </p>
            </div>
          </div>
          <div className="justify-around mt-8 px-1 max-w-full mx-auto">
            <div className="flex flex-wrap items-center gap-1">
              <div className="bg-yellow-100 px-5 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Event</p>
              </div>
              <div className="bg-yellow-100 px-7 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Lingkungan</p>
              </div>
              <div className="bg-yellow-100 px-7 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Relawan</p>
              </div>
            </div>
          </div>

          <div className="my-5 px-4">
            <div className="space-y-2 min-height-container">
              <p className="text-xs text-gray-600">
                Event Diselenggarakan: Selasa, 22 Oktober 2024
              </p>
              <h3 className="text-xl font-bold text-teal-700">
                Citarum To The Resue, Tatar Pasundan, Jawa Barat
              </h3>
              <div className="mt-2 max-h-48">
                <p className="text-xs text-gray-600 max-height-ellipsis">
                  #AksiBersihCinambo - Aksi Bersih Cinambo bertujuan untuk
                  mengurangi pencemaran sungai, melindungi ekosistem, dan
                  mencegah dampak buruk bagi kesehatan serta risiko banjir di
                  sekitar wilayah.
                </p>
              </div>
            </div>
            <div className="flex mt-5 space-x-4">
              <button className="w-full px-3 py-2 text-sm text-white bg-[#00609B] rounded-lg hover:bg-blue-600">
                GABUNG
              </button>
              <button className="w-full px-3 py-2 text-sm text-white bg-[#00609B] rounded-lg hover:bg-blue-600">
                DONASI
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-500 ease-in-out">
          <div className="relative w-full">
            <img src={event3} alt="event-4" className="w-full rounded-lg" />
            <div className="absolute left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex items-center justify-between py-3 px-2 rounded-3xl bg-yellow-100 w-full z-10">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                <div className="w-5 h-5 bg-pink-500 rounded-full"></div>
                <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
              </div>
              <p className="text-xs font-medium text-gray-700">
                + 32 orang telah bergabung
              </p>
            </div>
          </div>
          <div className="justify-around mt-8 px-1 max-w-full mx-auto">
            <div className="flex flex-wrap items-center gap-1">
              <div className="bg-yellow-100 px-5 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Event</p>
              </div>
              <div className="bg-yellow-100 px-7 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Lingkungan</p>
              </div>
              <div className="bg-yellow-100 px-7 py-1 flex items-center rounded-2xl">
                <p className="text-xs text-gray-700">Relawan</p>
              </div>
            </div>
          </div>

          <div className="my-5 px-4">
            <div className="space-y-2 min-height-container">
              <p className="text-xs text-gray-600">
                Event Diselenggarakan: Selasa, 22 Oktober 2024
              </p>
              <h3 className="text-xl font-bold text-teal-700">
                Citarum To The Resue, Tatar Pasundan, Jawa Barat
              </h3>
              <div className="mt-2 max-h-48">
                <p className="text-xs text-gray-600 max-height-ellipsis">
                  #AksiBersihCinambo - Aksi Bersih Cinambo bertujuan untuk
                  mengurangi pencemaran sungai, melindungi ekosistem, dan
                  mencegah dampak buruk bagi kesehatan serta risiko banjir di
                  sekitar wilayah.
                </p>
              </div>
            </div>
            <div className="flex mt-5 space-x-4">
              <button className="w-full px-3 py-2 text-sm text-white bg-[#00609B] rounded-lg hover:bg-blue-600">
                GABUNG
              </button>
              <button className="w-full px-3 py-2 text-sm text-white bg-[#00609B] rounded-lg hover:bg-blue-600">
                DONASI
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
