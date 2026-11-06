import z from "zod";

export const storeKaryawanSchema = z.object({
  nama_karyawan: z
    .string({ required_error: "Nama karyawan wajib diisi" })
    .trim()
    .min(1, "Nama karyawan tidak boleh kosong")
    .max(50, "Diisi dengan nama lengkap (maksimal 50 karakter)"),
  jabatan: z
    .string({ required_error: "Jabatan wajib diisi" })
    .trim()
    .min(1, "Jabatan tidak boleh kosong")
    .max(50, "Jabatan tidak boleh disingkat"),
  gaji: z
    .number({ required_error: "Gaji wajib diisi" })
    .positive("Gaji harus bilangan positif tanpa koma")
});

export const updateKaryawanSchema = z.object({
  nama_karyawan: z
    .string()
    .trim()
    .min(1, "Nama karyawan tidak boleh kosong")
    .max(50, "Diisi dengan nama lengkap")
    .optional(),
  jabatan: z
    .string()
    .trim()
    .min(1, "Jabatan tidak boleh kosong")
    .max(50, "Jabatan tidak boleh disingkat")
    .optional(),
  gaji: z
    .number()
    .positive("Gaji harus bilangan positif tanpa koma")
    .optional()
});

