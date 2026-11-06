import express from 'express'
import KaryawanController from '../controllers/karyawan.controller.js'
import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'

// Inisialisasi router Express
const router = express.Router()

// Endpoint Health-Check / Welcome
router.get('/welcome', WelcomeController.welcome)

// Endpoint Manajemen User & Upload
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

// Endpoint REST API Karyawan (CRUD)
// 1. GET - Menampilkan seluruh daftar data karyawan
router.get('/karyawan', KaryawanController.index)

// 2. GET by ID - Menampilkan detail data karyawan berdasarkan ID
router.get('/karyawan/:id', KaryawanController.show)

// 3. POST - Menambahkan data karyawan baru
router.post('/karyawan', KaryawanController.store)

// 4. PUT - Mengganti seluruh data karyawan berdasarkan ID
router.put('/karyawan/:id', KaryawanController.update)

// 5. PATCH - Memperbarui sebagian data karyawan berdasarkan ID
router.patch('/karyawan/:id', KaryawanController.update)

// 6. DELETE - Menghapus data karyawan berdasarkan ID
router.delete('/karyawan/:id', KaryawanController.delete)

// Ekspor router menggunakan standar ESM (ES Modules)
export default router