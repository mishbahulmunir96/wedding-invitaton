import * as Yup from "yup";

export const GiftConfirmationSchema = Yup.object({
  name: Yup.string().min(2, "Minimal 2 karakter").max(60).required("Nama wajib diisi"),
  amount: Yup.string()
    .matches(/^\d+$/, "Hanya angka")
    .required("Jumlah transfer wajib diisi"),
  message: Yup.string().max(300),
  proofFile: Yup.mixed<File>()
    .required("Bukti transfer wajib diupload")
    .test("fileSize", "Ukuran file maksimal 5MB", (value) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Format file harus JPG, PNG, atau PDF", (value) => {
      if (!value) return false;
      return ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(value.type);
    }),
});
