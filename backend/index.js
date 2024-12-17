import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise';
import multer from 'multer';
import path from 'path';
import midtransClient from 'midtrans-client';
import fs from 'fs';
import { eventValidationSchema } from './validation/event.js';
import { fileURLToPath } from 'url';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
    });
});

// Konfigurasi Database
let db;

const initDatabase = async () => {
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            // password: process.env.DB_PASSWORD || 'Nautika2024',
            port: 8889,
            password: 'root',
            database: process.env.DB_NAME || 'nautika',
        });
        console.log('Koneksi database berhasil');
    } catch (error) {
        console.error('Koneksi database gagal:', error);
        process.exit(1);
    }
};

// Konfigurasi Midtrans
const snap = new midtransClient.Snap({
    isProduction: false, // Ganti ke true untuk produksi
    serverKey: 'SB-Mid-server-EM2MmpJkTPcYNWPauekCnZAT',
});

// Endpoint Signup
app.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const [result] = await db.execute('INSERT INTO user (fullName, email, password) VALUES (?, ?, ?)', [
            fullName,
            email,
            password,
        ]);
        res.status(201).json({
            message: 'User berhasil didaftarkan',
            userId: result.insertId,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Gagal mendaftarkan user', error });
    }
});

// Endpoint Login (Admin dan User
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cek admin terlebih dahulu
        const [adminRows] = await db.execute('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password]);

        if (adminRows.length > 0) {
            // Jika admin ditemukan
            return res.status(200).json({
                message: 'Login berhasil',
                user: { email, role: 'admin', id: adminRows[0].id },
            });
        }

        // Cek user jika bukan admin
        const [userRows] = await db.execute('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);

        if (userRows.length > 0) {
            // Jika user ditemukan
            return res.status(200).json({
                message: 'Login berhasil',
                user: { email, role: 'user', id: userRows[0].id },
            });
        }

        // Jika tidak ditemukan
        res.status(401).json({ message: 'Email atau password salah' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Gagal login', error });
    }
});

/// Endpoint Midtrans QRIS
app.post('/proses_payment', async (req, res) => {
    try {
        const { amount, name, email } = req.body;

        // Validasi input
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                message: 'Invalid amount. It must be a positive number.',
            });
        }
        if (!name || typeof name !== 'string') {
            return res.status(400).json({
                message: 'Invalid name. It must be a non-empty string.',
            });
        }
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        const parameter = {
            transaction_details: {
                order_id: `order-${Date.now()}`, // ID transaksi unik
                gross_amount: parseInt(amount, 10), // Pastikan amount berupa integer
            },
            customer_details: {
                first_name: name,
                email: email,
            },
        };

        // Membuat transaksi menggunakan Snap API
        const transaction = await snap.createTransaction(parameter);

        // Response sukses
        res.status(200).json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
        });
    } catch (err) {
        console.error('Error creating transaction:', err.message, err.stack);
        res.status(500).json({
            message: 'Failed to create transaction. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined, // Jangan ekspos error detail pada produksi
        });
    }
});

// data masuk Formulir volunteer
app.post('/volunteer', async (req, res) => {
    try {
        const { first_name, last_name, email, phone_number, interest_reason, suitability_reason, job_role } = req.body;

        // Validasi manual
        if (!first_name || typeof first_name !== 'string' || first_name.trim() === '') {
            return res.status(400).json({
                message: 'First name is required and must be a valid string.',
            });
        }
        if (!last_name || typeof last_name !== 'string' || last_name.trim() === '') {
            return res.status(400).json({
                message: 'Last name is required and must be a valid string.',
            });
        }
        if (!email || typeof email !== 'string' || email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                message: 'Email is required and must be a valid email address.',
            });
        }
        if (
            !phone_number ||
            typeof phone_number !== 'string' ||
            phone_number.trim() === '' ||
            !/^\d+$/.test(phone_number)
        ) {
            return res.status(400).json({
                message: 'Phone number is required and must be numeric.',
            });
        }
        if (!interest_reason || typeof interest_reason !== 'string' || interest_reason.trim() === '') {
            return res.status(400).json({
                message: 'Interest reason is required and must be a valid string.',
            });
        }
        if (!suitability_reason || typeof suitability_reason !== 'string' || suitability_reason.trim() === '') {
            return res.status(400).json({
                message: 'Suitability reason is required and must be a valid string.',
            });
        }
        if (!job_role || typeof job_role !== 'string' || job_role.trim() === '') {
            return res.status(400).json({
                message: 'Job role is required and must be a valid string.',
            });
        }

        // Simpan ke database
        const query = `
        INSERT INTO volunteer 
        (first_name, last_name, email, phone_number, interest_reason, suitability_reason, job_role) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
        const values = [first_name, last_name, email, phone_number, interest_reason, suitability_reason, job_role];
        await db.execute(query, values);

        res.status(201).json({
            message: 'Volunteer application submitted successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Menyajikan file statis dari folder 'uploads'
app.use('/uploads', express.static('uploads'));

// Konfigurasi Multer untuk upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Direktori tempat file akan disimpan
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
    },
});

const upload = multer({ storage: storage });

const eventStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage/event');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        return cb(new Error('Hanya file gambar yang diperbolehkan'), false);
    }
};

const uploadEventPhoto = multer({
    storage: eventStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5MB
});

// const uploadsDir = "./storage/event";
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }

const validateEventData = (req, res, next) => {
    const { error } = eventValidationSchema.validate(req.body);
    if (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Gagal menghapus file gambar:', err);
                }
            });
        }
        return res.status(400).json({
            message: 'Validasi gagal',
            details: error.details.map((detail) => detail.message),
        });
    }
    next();
};

app.get('/event', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM event');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mendapatkan data event' });
    }
});

app.delete('/event/:id', async (req, res) => {
    const eventId = req.params.id;
    try {
        const [result] = await db.execute('DELETE FROM event WHERE id = ?', [eventId]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete event' });
    }
});

app.get('/event/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.execute('SELECT * FROM event WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal mendapatkan data event' });
    }
});

app.post('/event', uploadEventPhoto.single('photo'), validateEventData, async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'File gambar tidak ditemukan' });
    }

    try {
        const { title, description, team, date, location, time, equipment, activity, event_type, deadline } = req.body;
        const photoPath = req.file.path.replace(/\\/g, '/');

        const query = `INSERT INTO event (title, description, team, date, location, time, equipment, activity, photo, event_type, deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            title,
            description,
            team,
            date,
            location,
            time,
            equipment,
            activity,
            photoPath,
            parseInt(event_type),
            deadline,
        ];
        const [result] = await db.execute(query, values);

        const newEvent = {
            id: result.insertId,
            title,
            description,
            team,
            date,
            location,
            time,
            equipment,
            activity,
            photo: photoPath,
            event_type,
            deadline,
        };

        res.status(201).json(newEvent);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Terjadi kesalahan saat menyimpan data',
            error: error.message,
        });
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/file', (req, res) => {
    const { image } = req.query;
    if (!image) {
        return res.status(400).json({ error: 'Parameter "image" diperlukan' });
    }

    const safePath = path.resolve(__dirname, image.includes('/event') ? image : `uploads/${image}`);
    res.sendFile(safePath, (err) => {
        if (err) {
            return res.status(404).json({ error: 'Gambar tidak ditemukan' });
        }
    });
});

// Fetch a specific volunteer by ID
app.get('/volunteer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.execute('SELECT * FROM volunteer WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching volunteer data' });
    }
});

app.get('/volunteer', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM volunteer');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching volunteer data' });
    }
});

// Endpoint untuk mengunggah laporan isu
app.post('/report_issue', upload.single('photo'), async (req, res) => {
    try {
        const { full_name, phone, title, location, description, expectation } = req.body;

        const photo = req.file ? req.file.filename : null;

        // Validasi input
        if (!full_name || !phone || !title || !location || !description || !expectation || !photo) {
            return res.status(400).json({ message: 'Semua field wajib diisi, termasuk foto.' });
        }

        // Simpan data ke database
        const query = `
      INSERT INTO issue 
      (full_name, phone, title, location, description, expectation, photo, approval_status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const values = [full_name, phone, title, location, description, expectation, photo, 0];
        await db.execute(query, values);

        res.status(201).json({
            message: 'Laporan berhasil disimpan',
            photo_url: `/uploads/${photo}`,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Gagal menyimpan laporan', error });
    }
});

app.get('/issue', async (req, res) => {
    try {
        const [result] = await db.execute('SELECT * FROM issue');
        return res.status(200).json({
            result,
        });
    } catch (error) {
        console.error('Terjadi kesalhan', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

app.get('/issue', async (req, res) => {
    try {
        const [result] = await db.execute('SELECT * FROM issue');
        return res.status(200).json({
            result,
        });
    } catch (error) {
        console.error('Terjadi kesalhan', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

app.get('/issue/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('SELECT * FROM issue WHERE id = ?', [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        return res.status(200).json({
            result: result[0],
        });
    } catch (error) {
        console.error('Terjadi kesalahan', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

app.patch('/issue/approval', async (req, res) => {
    const { status_aproval, id } = req.body;

    if (!status_aproval || !id) {
        return res.status(400).json({ error: 'Permintaan aproval issue tidak valid' });
    }

    try {
        const [result] = await db.execute('UPDATE issue SET approval_status = ? WHERE id = ?', [status_aproval, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Isseu tidak ditemukan.' });
        }
        const [updatedIssue] = await db.execute('SELECT * FROM issue WHERE id = ?', [id]);

        return res.status(200).json({
            message: 'Status issue berhasil di update',
            issue: updatedIssue[0],
        });
    } catch (error) {
        console.error('Error updating approval status:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET Profile Data by ID
app.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Ambil data user berdasarkan ID
        const [rows] = await db.execute('SELECT id, fullName, email FROM user WHERE id = ?', [id]);

        // Jika user tidak ditemukan
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        res.status(200).json({ message: 'User ditemukan', user: rows[0] });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Gagal mengambil data user', error });
    }
});

// PUT Update Profile Data
app.put('/user', async (req, res) => {
    const { id, fullName, email } = req.body;

    try {
        // Validasi input
        if (!id || !fullName || !email) {
            return res.status(400).json({ message: 'Semua data wajib diisi' });
        }

        // Query untuk update data user
        const [result] = await db.execute('UPDATE user SET fullName = ?, email = ? WHERE id = ?', [
            fullName,
            email,
            id,
        ]);

        // Cek apakah ada data yang diperbarui
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        } else {
            const [rows] = await db.execute('SELECT id, fullName, email FROM user WHERE id = ?', [id]);
            res.status(200).json({
                message: 'Profil berhasil diperbarui',
                user: rows[0],
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Gagal memperbarui profil', error });
    }
});

// PUT Change Password
app.put('/user/change-password', async (req, res) => {
    const { id, oldPassword, newPassword } = req.body;

    try {
        // Validasi input
        if (!id || !oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Semua data wajib diisi' });
        }

        // Cek apakah password lama sesuai dengan yang ada di database
        const [rows] = await db.execute('SELECT password FROM user WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        const storedPassword = rows[0].password;

        // Verifikasi password lama
        if (storedPassword !== oldPassword) {
            return res.status(400).json({ message: 'Password lama tidak sesuai' });
        }

        // Update password jika validasi berhasil
        const [result] = await db.execute('UPDATE user SET password = ? WHERE id = ?', [newPassword, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        res.status(200).json({ message: 'Password berhasil diperbarui' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Gagal memperbarui password', error });
    }
});

// Endpoint Utama
app.get('/', (req, res) => {
    res.send('Server berjalan dengan baik!');
});

// Inisialisasi Server
const startServer = async () => {
    await initDatabase(); // Inisialisasi koneksi database
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
};

startServer();
