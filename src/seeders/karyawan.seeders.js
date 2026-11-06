import mongoose from 'mongoose'
import connectDB from '../config/database.js' // Sesuaikan path koneksi DB
import KaryawanModel from '../model/Karyawan.model.js' // Sesuaikan path model Karyawan

// Data dummy yang akan di-seed
const samples = [
  { nama_karyawan: 'Budi Santoso', 
    jabatan: 'Backend Developer', 
    gaji: 8500000 },
  { nama_karyawan: 'Siti Rahmawati', 
    jabatan: 'Frontend Developer', 
    gaji: 8000000 },
  { nama_karyawan: 'Andi Wijaya', 
    jabatan: 'UI/UX Designer', 
    gaji: 7500000 },
  { nama_karyawan: 'Dewi Lestari', 
    jabatan: 'Quality Assurance', 
    gaji: 7000000 },
  { nama_karyawan: 'Rian Hidayat', 
    jabatan: 'DevOps Engineer', 
    gaji: 9500000 }
]

const seed = async () => {
  const counts = { karyawan: 0 }

  try {
    await connectDB()

    // Menginisialisasi index dan membersihkan data lama
    await KaryawanModel.init()
    await KaryawanModel.deleteMany() // atau await mongoose.connection.dropDatabase()
    console.log('Database cleared')

    await KaryawanModel.createIndexes()

    // Proses insert data per baris
    for (const sample of samples) {
      await KaryawanModel.create(sample)
      counts.karyawan += 1
    }
  } catch (error) {
    console.error('Seeding failed:', error.message)
    process.exitCode = 1
  } finally {
    // Log hasil insert data
    for (const [model, count] of Object.entries(counts)) {
      console.log(`${model}: ${count} inserted`)
    }

    // Memastikan koneksi MongoDB terputus di akhir
    try {
      await mongoose.disconnect()
      console.log('MongoDB disconnected cleanly')
    } catch (error) {
      console.error('MongoDB disconnect failed:', error.message)
      process.exitCode = 1
    }
  }
}

seed()