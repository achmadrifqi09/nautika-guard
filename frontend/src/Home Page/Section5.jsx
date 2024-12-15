import React from "react";
import event4 from "../assets/event-4.png";
import event5 from "../assets/event-5.png";
import event6 from "../assets/event-6.png";
import event7 from "../assets/event-7.png";
import event8 from "../assets/event-8.png";
import event9 from "../assets/event-9.png";
import event10 from "../assets/event-10.png";

const Section5 = () => {
  return (
    <section className="flex flex-col justify-between items-center py-3">
      <div className="flex flex-col items-center">
        <div className="text-center mt-6 mb-10">
          <h2 className="text-5xl font-bold text-gray-600">
            Event yang Tersedia
          </h2>
        </div>
      </div>
      <div id="eventCard" className="flex flex-col gap-7 max-w-full">
        <div className="flex flex-row justify-between">
          <div className="relative">
            <img src={event4} alt="event-4" />
            <div className="absolute bottom-0 left-0 p-5 max-w-80 text-white">
              <p>#AksiBersihBrantas</p>
              <p>
                Pemuda Surabaya bergotong royong membersihkan Sungai Brantas,
                mengurangi sampah plastik dan limbah rumah tangga untuk menjaga
                ekosistem perairan.
              </p>
            </div>
          </div>
          <div className="relative">
            <img src={event5} alt="event-5" />
            <div className="absolute top-0 left-0 p-5 max-w-80 text-white">
              <p>#MudaPeduliCitarum</p>
              <p>
                Aksi bersama di Bandung untuk membersihkan Sungai Citarum dari
                pencemaran limbah, dengan melibatkan komunitas lokal dan para
                pemuda peduli lingkungan.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="relative">
              <img src={event6} alt="event-6" />
              <div className="absolute bottom-0 left-0 p-5 text-white">
                #BersihkanBengawanSolo
              </div>
            </div>
            <div className="relative">
              <img src={event7} alt="event-7" />
              <div className="absolute bottom-0 left-0 p-5 text-white">
                #PeduliSungaiMahakam
              </div>
            </div>
            <div className="relative">
              <img src={event8} alt="event-8" />
              <div className="absolute bottom-0 left-0 p-5 text-white">
                #GerakanCintaMusi
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <div className="relative">
            <img src={event9} alt="event-9" />
            <div className="absolute bottom-0 left-0 p-5 max-w-96 text-white">
              <p>#AksiBersihKahayan</p>
              <p>
                Kegiatan gotong royong di Palangkaraya untuk membersihkan Sungai
                Kahayan, menjaga aliran sungai tetap jernih dan bebas dari
                sampah plastik.
              </p>
            </div>
          </div>
          <div className="relative">
            <img src={event10} alt="event-10" />
            <div className="absolute top-0 left-0 p-5 text-white">
              <p>#AksiNyataPemudaBanjirKanal</p>
              <p>
                Pemuda Semarang beraksi membersihkan Banjir Kanal Timur dari
                sampah, untuk mencegah banjir dan meningkatkan kesadaran
                masyarakat dalam menjaga kebersihan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;
