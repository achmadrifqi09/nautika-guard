import React, { useState } from 'react';
import Donasi from './Donasi'; // Pastikan file Donasi.jsx tersedia
import Fevent from './Fevent'; // Pastikan file Fevent.jsx tersedia
import Detail_Event from './Detail_Event'; // Pastikan file Detail_Event.jsx tersedia

// Komponen EventCard
const EventCard = ({ image, volunteers, tags, date, title, description, onGabungClick, onDonasiClick, onImageClick }) => (
    <div className="bg-white shadow-md rounded-lg p-4 w-79.5 flex-shrink-0 h-full flex flex-col justify-between">
        <div>
            <img 
                src={image} 
                alt={title} 
                className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer" 
                onClick={onImageClick} 
            />
            <div className="flex items-center mb-2">
                <span className="text-black-600 text-sm">{volunteers} orang telah bergabung sebagai relawan</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
            <p className="text-black-1000 text-sm mb-2">Event Diselenggarakan: {date}</p>
            <h3 className="text-black-800 font-semibold text-lg mb-2">{title}</h3>
            <p className="text-black-600 text-sm">{description}</p>
        </div>
        <div className="flex justify-between mt-4">
            <button onClick={onGabungClick} className="bg-[#00609B] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#004e7a]">GABUNG</button>
            <button onClick={onDonasiClick} className="bg-[#00609B] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#004e7a]">DONASI</button>
        </div>
    </div>
);

// Komponen utama Newevent
const Newevent = () => {
    const [currentPage, setCurrentPage] = useState('events');
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleGabungClick = () => {
        setCurrentPage('fevent');
    };

    const handleDonasiClick = () => {
        setCurrentPage('donasi');
    };

    const handleImageClick = (event) => {
        setSelectedEvent(event);
        setCurrentPage('detail');
    };

    const events = [
        {
            image: '/images/event1.jpg',
            volunteers: 32,
            tags: ['Event', 'Lingkungan', 'Relawan'],
            date: 'Sabtu, 19 Oktober 2024',
            title: 'Peduli Pantai Kenjeran, Surabaya',
            description: 'Bersama-sama menjaga kelestarian laut dengan kegiatan bersih pantai.',
        },
        {
            image: '/images/event2.jpg',
            volunteers: 20,
            tags: ['Event', 'Relawan', 'Komunitas'],
            date: 'Minggu, 06 Oktober 2024',
            title: 'Sungai Cimanuk, Bandung',
            description: 'Aksi bersih-bersih Sungai Cimanuk dengan partisipasi masyarakat.',
        },
        {
            image: '/images/event3.jpg',
            volunteers: 50,
            tags: ['Event', 'Lingkungan'],
            date: 'Minggu, 27 Oktober 2024',
            title: 'Citarum To The Rescue, Jawa Barat',
            description: 'Membersihkan dan merestorasi Sungai Citarum agar lebih sehat.',
        },
        {
            image: '/images/event4.jpg',
            volunteers: 45,
            tags: ['Lingkungan', 'Sosial'],
            date: 'Sabtu, 26 Oktober 2024',
            title: 'Bengawan Solo Bersih, Sukoharjo',
            description: 'Melindungi kelestarian Sungai Bengawan Solo melalui aksi bersih.',
        },
        {
            image: '/images/event5.jpg',
            volunteers: 12,
            tags: ['Kesehatan', 'Lingkungan'],
            date: 'Sabtu, 02 November 2024',
            title: 'Kesadaran Sungai Sehat di Gresik',
            description: 'Mengajak masyarakat peduli dengan kebersihan sungai.',
        },
        {
            image: '/images/event10.jpg',
            volunteers: 28,
            tags: ['Relawan', 'Pendidikan'],
            date: 'Minggu, 03 November 2024',
            title: 'Edukasi Sungai Bersih, Makassar',
            description: 'Edukasi kebersihan sungai kepada generasi muda di Makassar.',
        },
        {
            image: '/images/event7.jpg',
            volunteers: 15,
            tags: ['Komunitas', 'Sosial'],
            date: 'Sabtu, 16 Oktober 2024',
            title: 'Pembersihan Sungai Banjarmasin',
            description: 'Aksi bersih sungai untuk lingkungan yang lebih sehat.',
        },
        {
            image: '/images/event8.jpg',
            volunteers: 38,
            tags: ['Event', 'Sosial'],
            date: 'Minggu, 17 Oktober 2024',
            title: 'Kesadaran Masyarakat Samarinda',
            description: 'Mengajak masyarakat Samarinda peduli pada kebersihan sungai.',
        },
        {
            image: '/images/event9.jpg',
            volunteers: 18,
            tags: ['Lingkungan', 'Edukasi'],
            date: 'Sabtu, 24 Oktober 2024',
            title: 'Sungai Sehat, Kota Madiun',
            description: 'Mengedukasi masyarakat Madiun mengenai kesehatan sungai.',
        },
        {
            image: '/images/event10.jpg',
            volunteers: 25,
            tags: ['Lingkungan', 'Sosial'],
            date: 'Sabtu, 10 Oktober 2024',
            title: 'Save the River, Pontianak',
            description: 'Aksi kebersihan sungai untuk masa depan lingkungan.',
        },
    ];

    // Render halaman berdasarkan state
    if (currentPage === 'donasi') {
        return <Donasi />;
    }

    if (currentPage === 'fevent') {
        return <Fevent />;
    }

    if (currentPage === 'detail') {
        return <Detail_Event event={selectedEvent} />;
    }

    // Tampilkan halaman event jika currentPage adalah 'events'
    return (
        <div className="p-8 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-6">Event Pembersihan</h2>
            <div className="overflow-x-auto mb-10">
                <div className="flex space-x-4">
                    {events.slice(0, 5).map((event, index) => (
                        <EventCard 
                            key={index} 
                            {...event} 
                            onGabungClick={handleGabungClick} 
                            onDonasiClick={handleDonasiClick} 
                            onImageClick={() => handleImageClick(event)}
                        />
                    ))}
                </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6">Event Edukasi</h2>
            <div className="overflow-x-auto">
                <div className="flex space-x-4">
                    {events.slice(5, 10).map((event, index) => (
                        <EventCard 
                            key={index} 
                            {...event} 
                            onGabungClick={handleGabungClick} 
                            onDonasiClick={handleDonasiClick} 
                            onImageClick={() => handleImageClick(event)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Newevent;
