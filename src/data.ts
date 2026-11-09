// Tipe data tiket helpdesk

export type Kategori = "WiFi" | "Komputer" | "Printer" | "Akun";
export type Status = "Open" | "Proses" | "Selesai";

export interface Tiket {
  id: string;
  nama: string;
  ruangan: string;
  kategori: Kategori;
  deskripsi: string;
  status: Status;
}

// Data statis 10 tiket helpdesk kampus
export const daftarTiket: Tiket[] = [
  {
    id: "1",
    nama: "Andi Pratama",
    ruangan: "Lab 1",
    kategori: "WiFi",
    deskripsi: "WiFi tidak bisa connect di Lab 1, muncul error authentication failed",
    status: "Open",
  },
  {
    id: "2",
    nama: "Siti Nurhaliza",
    ruangan: "Lab 2",
    kategori: "Komputer",
    deskripsi: "PC nomor 5 tidak mau menyala, lampu indikator mati total",
    status: "Proses",
  },
  {
    id: "3",
    nama: "Budi Santoso",
    ruangan: "Ruang Dosen",
    kategori: "Printer",
    deskripsi: "Printer HP LaserJet paper jam terus-menerus saat print dokumen",
    status: "Selesai",
  },
  {
    id: "4",
    nama: "Dewi Lestari",
    ruangan: "Lab 3",
    kategori: "Akun",
    deskripsi: "Tidak bisa login ke sistem akademik, password sudah direset tapi tetap gagal",
    status: "Open",
  },
  {
    id: "5",
    nama: "Rizky Ramadhan",
    ruangan: "Lab 1",
    kategori: "Komputer",
    deskripsi: "Monitor PC nomor 12 berkedip-kedip dan kadang mati sendiri",
    status: "Open",
  },
  {
    id: "6",
    nama: "Fajar Hidayat",
    ruangan: "Ruang Dosen",
    kategori: "WiFi",
    deskripsi: "Koneksi WiFi sangat lambat, video conference sering terputus",
    status: "Proses",
  },
  {
    id: "7",
    nama: "Nur Aisyah",
    ruangan: "Lab 2",
    kategori: "Printer",
    deskripsi: "Printer tidak terdeteksi di PC manapun setelah ganti toner",
    status: "Proses",
  },
  {
    id: "8",
    nama: "Hendra Wijaya",
    ruangan: "Lab 3",
    kategori: "Akun",
    deskripsi: "Akun email kampus terkunci setelah 3 kali salah password",
    status: "Selesai",
  },
  {
    id: "9",
    nama: "Putri Wulandari",
    ruangan: "Lab 1",
    kategori: "Komputer",
    deskripsi: "Keyboard PC nomor 8 beberapa tombol tidak berfungsi",
    status: "Selesai",
  },
  {
    id: "10",
    nama: "Arif Rahman",
    ruangan: "Ruang Dosen",
    kategori: "WiFi",
    deskripsi: "Tidak bisa akses portal jurnal online melalui jaringan kampus",
    status: "Open",
  },
];
