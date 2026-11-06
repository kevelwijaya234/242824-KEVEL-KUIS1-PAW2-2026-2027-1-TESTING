import mongoose from "mongoose";
import KaryawanModel from "../model/Karyawan.model.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";
import { storeKaryawanSchema, updateKaryawanSchema } from "../schemas/Karyawan.schema.js";

class KaryawanController {
 // Get All Karyawan (Search & Sort)
  static async index(req, res) {
    try {
      // 1. Tangkap 'search', 'sortBy', dan 'sort' dari query params
      const { search, sortBy = "nama_karyawan", sort } = req.query; 
      const filter = {}; 
      
      // 2. Jika parameter 'search' diisi di Postman, lakukan pencarian berdasarkan nama_karyawan
      if (search) { 
        filter.nama_karyawan = { 
          $regex: search, 
          $options: "i", // case-insensitive
        }; 
      } 
      
      // 3. Logika sorting (default asc jika 'sort' tidak diisi / bernilai selain 'desc')
      const sortOption = { 
        [sortBy]: sort === "desc" ? -1 : 1, 
      }; 

      // 4. Ambil data dari database
      const listKaryawan = await KaryawanModel.find(filter) 
        .select({ 
          _id: 1, 
          nama_karyawan: 1, 
          jabatan: 1, 
          gaji: 1, 
          createdAt: 1, 
          updatedAt: 1, 
        }) 
        .sort(sortOption); 

      return apiResponse({
        res,
        status: 200,
        message: "List Karyawan",
        data: listKaryawan
      });
    } catch (error) {
      return apiResponse({ res, status: 500, message: error.message });
    }
  }

  // Get Detail Karyawan by ID
  static async show(req, res) {
    try {
      const KaryawanId = req.params.id;

      // Validasi format ID MongoDB
      if (!mongoose.Types.ObjectId.isValid(KaryawanId)) {
        return apiResponse({ res, status: 400, message: 'Format ID tidak valid' });
      }

      const Karyawan = await KaryawanModel.findById(KaryawanId);
      
      // Cek jika data tidak ditemukan
      if (!Karyawan) {
        return apiResponse({ res, status: 404, message: 'Karyawan tidak ditemukan' });
      }

      return apiResponse({
        res,
        status: 200,
        message: "Detail Karyawan",
        data: Karyawan
      });
    } catch (error) {
      return apiResponse({ res, status: 500, message: error.message });
    }
  }

  // Create Karyawan
  static async store(req, res) {
    try {
      const result = storeKaryawanSchema.safeParse(req.body);
      if (!result.success) {
        return apiResponseValidation({
          res,
          errors: result.error
        });
      }
      
      const { nama_karyawan, jabatan, gaji } = result.data;

      const Karyawan = await KaryawanModel.create({
        nama_karyawan,
        jabatan,
        gaji
      });

      return apiResponse({
        res,
        status: 201, // HTTP Status 201 Created
        message: "Karyawan berhasil dibuat",
        data: Karyawan
      });
    } catch (error) {
      return apiResponse({ res, status: 500, message: error.message });
    }
  }

  // Update Karyawan by ID
  static async update(req, res) {
    try {
      const KaryawanId = req.params.id;

      // Validasi format ID MongoDB
      if (!mongoose.Types.ObjectId.isValid(KaryawanId)) {
        return apiResponse({ res, status: 400, message: 'Format ID tidak valid' });
      }

      const result = updateKaryawanSchema.safeParse(req.body);
      if (!result.success) {
        return apiResponseValidation({
          res,
          errors: result.error
        });
      }

      const { nama_karyawan, jabatan, gaji } = result.data;

      const updateKaryawan = await KaryawanModel.findOneAndUpdate(
        { _id: KaryawanId },
        { nama_karyawan, jabatan, gaji },
        { new: true, runValidators: true }
      );

      if (!updateKaryawan) {
        return apiResponse({ res, status: 404, message: 'Karyawan tidak ditemukan' });
      }

      return apiResponse({ 
        res, 
        status: 200, 
        message: 'Karyawan berhasil diperbarui',
        data: updateKaryawan 
      });
    } catch (error) {
      return apiResponse({ res, status: 500, message: error.message });
    }
  }

  // Delete Karyawan by ID
  static async delete(req, res) {
    try {
      const KaryawanId = req.params.id;

      // Validasi format ID MongoDB
      if (!mongoose.Types.ObjectId.isValid(KaryawanId)) {
        return apiResponse({ res, status: 400, message: 'Format ID tidak valid' });
      }

      const deletedKaryawan = await KaryawanModel.findOneAndDelete({ _id: KaryawanId });

      if (!deletedKaryawan) {
        return apiResponse({ res, status: 404, message: 'Karyawan tidak ditemukan' });
      }

      return apiResponse({ 
        res, 
        status: 200, 
        message: 'Karyawan berhasil dihapus', 
        data: null 
      });
    } catch (error) {
      return apiResponse({ res, status: 500, message: error.message });
    }
  }
}

export default KaryawanController;