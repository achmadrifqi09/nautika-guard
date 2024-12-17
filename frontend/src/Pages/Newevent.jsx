import React, { useEffect, useState } from 'react';
import Donasi from './Donasi'; // Pastikan file Donasi.jsx tersedia
import Fevent from './Fevent'; // Pastikan file Fevent.jsx tersedia
import Detail_Event from './Detail_Event'; // Pastikan file Detail_Event.jsx tersedia
import axios from 'axios';

const Excerpt = ({ text, maxLength }) => {
    const createExcerpt = (str, max) => {
        if (str.length <= max) {
            return str;
        }
        return str.slice(0, max) + '...';
    };

    return <p className="text-black-600 text-sm">{createExcerpt(text, maxLength)}</p>;
};

// Komponen EventCard
const EventCard = ({ photo, date, title, time, description, onGabungClick, onDonasiClick, onImageClick, onBack }) => (
    <div className="bg-white shadow-md rounded-lg p-4 w-79.5 flex-shrink-0 h-full flex flex-col justify-between">
        <div>
            <img
                src={`http://202.10.42.158:3001/file?image=${photo}`}
                alt={title}
                className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer"
                onClick={onImageClick}
            />
            <p className="text-black-1000 text-sm mb-2">
                Event Diselenggarakan: {date} {time}
            </p>
            <h3 className="text-black-800 font-semibold text-lg mb-2">{title}</h3>
            <Excerpt text={description} maxLength={38} />
        </div>
        <div className="flex justify-between mt-4">
            <button
                onClick={onGabungClick}
                className="bg-[#00609B] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#004e7a]"
            >
                GABUNG
            </button>
            <button
                onClick={onDonasiClick}
                className="bg-[#00609B] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#004e7a]"
            >
                DONASI
            </button>
        </div>
    </div>
);

// Komponen utama Newevent
const Newevent = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState('events');
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleGabungClick = () => {
        setCurrentPage('fevent');
    };

    const handleFetchEvent = async () => {
        const response = await axios.get('http://202.10.42.158:3001/event');
        if (response.status == 200) {
            setEvents(response.data);
        }
    };

    const handleDonasiClick = () => {
        setCurrentPage('donasi');
    };

    const handleImageClick = (event) => {
        setSelectedEvent(event);
        setCurrentPage('detail');
    };

    useEffect(() => {
        handleFetchEvent();
    }, []);

    if (currentPage === 'donasi') {
        return <Donasi />;
    }

    if (currentPage === 'fevent') {
        return <Fevent />;
    }

    if (currentPage === 'detail') {
        return <Detail_Event event={selectedEvent} onBack={() => setCurrentPage('events')} />;
    }

    function checkEventType(arr, eventType) {
        return arr.some((item) => item.event_type === eventType);
    }

    // Tampilkan halaman event jika currentPage adalah 'events'
    return (
        <div className="p-8 bg-gray-100 min-h-dvh">
            <h2 className="text-2xl font-semibold mb-6">Kegiatan Pembersihan</h2>
            <div className="overflow-x-auto mb-10">
                <div className="flex space-x-4">
                    {events?.map(
                        (event, index) =>
                            event.event_type == 1 && (
                                <EventCard
                                    key={index}
                                    {...event}
                                    onGabungClick={handleGabungClick}
                                    onDonasiClick={handleDonasiClick}
                                    onImageClick={() => handleImageClick(event)}
                                />
                            )
                    )}
                    {!checkEventType(events, 1) && (
                        <p className="px-6 py-8 bg-white w-full text-lg rounded-lg">
                            Belum ada kegiatan pembersihan untuk saat ini
                        </p>
                    )}
                </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6">Kegiatan Edukasi</h2>
            <div className="overflow-x-auto mb-10">
                <div className="flex space-x-4">
                    {events?.map(
                        (event, index) =>
                            event.event_type == 2 && (
                                <EventCard
                                    key={index}
                                    {...event}
                                    onGabungClick={handleGabungClick}
                                    onDonasiClick={handleDonasiClick}
                                    onImageClick={() => handleImageClick(event)}
                                />
                            )
                    )}
                    {!checkEventType(events, 2) && (
                        <p className="px-6 py-8 bg-white w-full text-lg rounded-lg">
                            Belum ada kegiatan edukasi untuk saat ini
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Newevent;
