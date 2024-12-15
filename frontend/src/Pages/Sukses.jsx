import React from "react";

    const Sukses = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl text-center">
            {" "}
            <h2 className="text-2xl font-semibold text-black mb-6 mt-6 text-center">
            Pembayaran Berhasil!
            </h2>
            <p className="text-xl font-semibold text-black text-center">
            Donasi anda telah masuk,
            <br />
            terima kasih telah membantu para pejuang!
            </p>
            <div className="my-4 flex justify-center">
            <div><img src="/images/success.png"  alt="" className="w-80 h-80"/></div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
            Donasi ini akan sepenuhnya digunakan untuk mendukung kelancaran
            kegiatan Volunteer. Setiap kontribusi Anda akan membantu menyediakan
            peralatan, logistik, serta edukasi lingkungan bagi peserta, demi
            menjaga kebersihan sungai dan melindungi ekosistem setempat. Terima
            kasih atas dukungan Anda!
            </p>
        </div>
        </div>
    );
    };

export default Sukses;