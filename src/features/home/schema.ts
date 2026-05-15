import * as Yup from "yup";

export const RsvpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nama minimal 2 karakter")
    .max(60, "Nama maksimal 60 karakter")
    .required("Nama wajib diisi"),
  attendance: Yup.string()
    .oneOf(["hadir", "tidak_hadir", "ragu"], "Pilih konfirmasi kehadiran")
    .required("Pilih konfirmasi kehadiran"),
  guestCount: Yup.number()
    .typeError("Jumlah tamu harus angka")
    .min(1, "Minimal 1 tamu")
    .max(10, "Maksimal 10 tamu")
    .required("Jumlah tamu wajib diisi"),
});

export const WishSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nama minimal 2 karakter")
    .max(60, "Nama maksimal 60 karakter")
    .required("Nama wajib diisi"),
  message: Yup.string()
    .min(5, "Ucapan minimal 5 karakter")
    .max(300, "Ucapan maksimal 300 karakter")
    .required("Ucapan wajib diisi"),
});
