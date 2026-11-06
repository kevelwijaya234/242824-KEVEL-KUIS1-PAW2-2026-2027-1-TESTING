import mongoose from 'mongoose';

const KaryawanSchema = new mongoose.Schema(
  {
    nama_karyawan: {
      type: String,
      required: [true, 'Nama karyawan wajib diisi'],
      trim: true
    },
    jabatan: {
      type: String,
      required: [true, 'Jabatan wajib diisi'],
      trim: true
    },
    gaji: {
      type: Number,
      required: [true, 'Gaji wajib diisi'],
      min: [0, 'Gaji tidak boleh negatif']
    }
  },
  {
    timestamps: true,
    collection: 'karyawan' // Menentukan nama collection di MongoDB
  }
);

const KaryawanModel = mongoose.model('Karyawan', KaryawanSchema);
export default KaryawanModel;