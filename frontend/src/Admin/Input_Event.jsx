import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
    CalendarDays,
    Clock,
    MapPin,
    UsersRound,
    Watch,
    WatchIcon,
} from "lucide-react";

const Input_Event = () => {
    const [menu, setMenu] = useState("event");
    const [events, setEvent] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        team: "",
        location: "",
        date: "",
        time: "",
        equipment: "",
        description: "",
        activity: "",
        event_type: "",
        deadline: "",
    });
    const [photo, setPhoto] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();

        Object.keys(formData).forEach((key) => {
            formDataToSubmit.append(key, formData[key]);
        });

        if (photo) {
            formDataToSubmit.append("photo", photo);
        }

        try {
            const response = await axios.post(
                "http://localhost:3001/event",
                formDataToSubmit,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status == 201) {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: `Data event ${formData.title} berhasil ditambahkan`,
                });

                setFormData({
                    title: "",
                    team: "",
                    location: "",
                    date: "",
                    time: "",
                    equipment: "",
                    description: "",
                    activity: "",
                    event_type: "",
                    deadline: "",
                });
                setPhoto(null);
                setPreviewImage(null);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Opps",
                text: "Gagal menambahkan event",
            });
        }
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    const handleDeleteEvent = (event) => {
        Swal.fire({
            title: "Peringatan",
            text: `Hapus anda yakin akan menghapus event ${event.title} ?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Hapus",
            denyButtonText: `Batal`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:3001/event/${event.id}`)
                    .then(() => {
                        fetchEvent();
                        Toast.fire({
                            icon: "success",
                            title: "Berhasil menghapus event",
                        });
                    })
                    .catch(() => {
                        Toast.fire({
                            icon: "error",
                            title: "Terjadi kesalahan saat menghapus event",
                        });
                    });
            }
        });
    };

    const fetchEvent = async () => {
        const response = await axios.get("http://localhost:3001/event");
        if (response.status === 200) {
            setEvent(response?.data);
        }
    };

    useEffect(() => {
        if (menu === "event") {
            fetchEvent();
        }
    }, [menu]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Event</h2>
            <div className="flex space-x-4 border-b pb-3 mb-6">
                <button
                    onClick={() => setMenu("event")}
                    className={`py-2 px-4 font-medium ${
                        menu === "event"
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-gray-600"
                    }`}
                >
                    Daftar Event
                </button>
                <button
                    onClick={() => setMenu("add-event")}
                    className={`py-2 px-4 font-medium ${
                        menu === "add-event"
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-gray-600"
                    }`}
                >
                    Tambah Event
                </button>
            </div>
            {menu === "add-event" && (
                <form
                    onSubmit={handleSubmit}
                    className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8"
                >
                    <section className="flex gap-8">
                        <div className="w-1/2">
                            <div className="flex items-center justify-center bg-gray-200 h-64 rounded-lg mb-4">
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="max-h-full max-w-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                        <span className="text-[#00609B] hover:text-white font-semibold">
                                            + Tambah Foto
                                        </span>
                                    </label>
                                )}
                            </div>
                            <label className="block text-gray-700 font-semibold mb-1">
                                Deskripsi{" "}
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Masukkan Deskripsi Event"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
                                maxLength={100}
                                rows={4}
                                required
                            ></textarea>
                            <label className="block text-gray-700 font-semibold mb-1">
                                Kegiatan
                            </label>
                            <textarea
                                name="activity"
                                value={formData.activity}
                                onChange={handleInputChange}
                                placeholder="Masukkan Kegiatan apa saja yang akan dilaksanakan"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
                                maxLength={100}
                                rows={4}
                                required
                            ></textarea>
                        </div>
                        <div className="w-1/2">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan judul"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Nama Tim
                                </label>
                                <input
                                    type="text"
                                    name="team"
                                    value={formData.team}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Nama Tim"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Lokasi
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Lokasi"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Tanggal Pelaksanaan
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Tanggal"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Batas Pendaftaran
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Tanggal"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Jenis Event
                                </label>
                                <select
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                                    name="event_type"
                                    onChange={handleInputChange}
                                >
                                    <option value="1">Pembersihan</option>
                                    <option value="2">Edukasi</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Waktu Diselenggarakan
                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Waktu"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Perlengkapan
                                </label>
                                <input
                                    type="text"
                                    name="equipment"
                                    value={formData.equipment}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Perlengkapan"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-4 mt-8">
                                <button
                                    type="button"
                                    className="py-2 px-6 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-6 bg-[#00609B] hover:bg-blue-600 text-white rounded-lg font-semibold"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </section>
                </form>
            )}

            {menu === "event" && (
                <div className="flex flex-col gap-6">
                    {events?.map((event, i) => {
                        return (
                            <div
                                className="flex gap-4 bg-white rounded-md p-4 shadow-md flex-col lg:flex-row items-center lg:items-start"
                                key={i}
                            >
                                <div className="relative w-full min-w-[18em] lg:max-w-[32em] relative">
                                    <div className="absolute bg-[#00609B] z-10 top-2 text-white font-medium px-2.5 left-2 rounded-full text-sm py-1">
                                        {event.event_type === 1
                                            ? "Pembersihan"
                                            : "Edukasi"}
                                    </div>
                                    <div className="    aspect-[4/3] relative w-full  min-w-[18em] lg:max-w-[32em] relative">
                                        <img
                                            src={`http://localhost:3001/file?image=${event.photo}`}
                                            className="w-full h-full object-cover absolute top-0 left-0"
                                            alt="Event Thumbnail"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-purple-800 text-xl font-medium mb-2">
                                        {event.title}
                                    </h5>
                                    <div className="grid grid-cols-2 gap-2 w-max">
                                        <div className="flex gap-2 items-center">
                                            <UsersRound className="w-5 h-5 " />
                                            <p>{event.team}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <CalendarDays className="w-5 h-5" />
                                            <p>{event.date}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <Clock className="w-5 h-5" />
                                            <p>{event.time}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <MapPin className="w-5 h-5" />
                                            <p>{event.location}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-medium mb-1 mt-3">
                                            Peralatan
                                        </h2>
                                        <p className="text-gray-700 mb-2">
                                            {event.equipment}
                                        </p>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-medium mb-1 mt-3">
                                            Kegiatan
                                        </h2>
                                        <p className="text-gray-700 mb-2">
                                            {event.activity}
                                        </p>
                                    </div>

                                    <h2 className="text-lg font-medium mb-1">
                                        Deskripsi
                                    </h2>
                                    <p className="text-gray-700">
                                        {event.description}
                                    </p>
                                    <div>
                                        <button
                                            onClick={() =>
                                                handleDeleteEvent(event)
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md mt-4"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {events?.length === 0 && (
                        <p>Tidak ada event yang tersedia</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Input_Event;
