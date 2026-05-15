import { WeddingData } from "@/types/wedding";

export const WEDDING_DATE_ISO = "2026-06-10T09:00:00+07:00";

// Rekening untuk amplop digital - silakan ganti dengan nomor sebenarnya
export interface BankAccount {
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

export const bankAccounts: BankAccount[] = [
  {
    bank: "Bank BRI",
    accountNumber: "340701040865530",
    accountHolder: "Mishbahul Munir",
  },
];

// Daftar foto galeri - taruh file di public/images/gallery-N.jpg
// Bisa ditambah/dikurangi sesuai kebutuhan.
export const galleryImages: { src: string; alt: string }[] = [
  { src: "/images/gallery-1.jpg", alt: "Prewedding photo 1" },
  { src: "/images/gallery-2.jpg", alt: "Prewedding photo 2" },
  { src: "/images/gallery-3.jpg", alt: "Prewedding photo 3" },
  { src: "/images/gallery-4.jpg", alt: "Prewedding photo 4" },
  { src: "/images/gallery-5.jpg", alt: "Prewedding photo 5" },
  { src: "/images/gallery-6.jpg", alt: "Prewedding photo 6" },
];

export const weddingData: WeddingData = {
  groom: {
    name: "Mishbahul Munir",
    nickname: "Misbah",
    parents: {
      father: "Bapak Kumaidi",
      mother: "Ibu Ahwalul Munifah",
    },
    order: "Putra",
    address:
      "Gebang Anom 2, RT 3 RW 2, Desa Sumur, Kec. Brangsong, Kab. Kendal",
    initial: "M",
  },
  bride: {
    name: "Kuni Sa'adati",
    nickname: "Kuni",
    parents: {
      father: "Bapak Mahmudin",
      mother: "Ibu Tasmiyah",
    },
    order: "Putri",
    address:
      "Gedompon 2, RT 8 RW 4, Desa Ngipik, Kec. Pringsurat, Kab. Temanggung",
    initial: "K",
  },
  weddingDate: WEDDING_DATE_ISO,
  weddingDateDisplay: {
    day: "Rabu",
    date: "10",
    month: "Jun",
    year: "2026",
  },
  events: [
    {
      type: "Akad Nikah",
      date: "Rabu, 10 Juni 2026",
      time: "09.00 WIB – selesai",
      venue: "Kediaman Mempelai Putri",
      address:
        "Gedompon 2, RT 8 RW 4, Desa Ngipik, Kec. Pringsurat, Kab. Temanggung",
      mapUrl: "https://maps.app.goo.gl/hhK9gf1GRon1SrSY6",
      icon: "🕌",
    },
    {
      type: "Resepsi Pernikahan",
      date: "Rabu, 10 Juni 2026",
      time: "11.00 WIB – selesai",
      venue: "Kediaman Mempelai Putri",
      address:
        "Gedompon 2, RT 8 RW 4, Desa Ngipik, Kec. Pringsurat, Kab. Temanggung",
      mapUrl: "https://maps.app.goo.gl/hhK9gf1GRon1SrSY6",
      icon: "🥂",
    },
  ],
};
