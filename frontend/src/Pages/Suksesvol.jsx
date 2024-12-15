import React from "react";

    const Suksesvol = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl text-center">
            {" "}
            <h2 className="text-2xl font-semibold text-black mb-6 mt-6 text-center">
            Formulir Terkirim!
            </h2>
            <p className="text-xl font-semibold text-black text-center">
            Formulir berhasil terkirim,
            <br />
            mohon cek berkala Email anda untuk pengumuman penerimaan.
            </p>
            <div className="my-4 flex justify-center">
            <div><img src="/images/suksesvol.png"  alt="" className="w-80 h-80"/></div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
            Keinginan anda untuk berpartisipasi menjadi relawan sangat kami hargai, kepedulian anda berharga untuk kita, Indonesia, dan dunia.
            </p>
        </div>
        </div>
    );
    };

export default Suksesvol;