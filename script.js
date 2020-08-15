let lama = [10, 23, 456, 21, 77, 85, 19, 92, 43, 35];

const apPrima = angka => {
  for(let i = 2; i < angka; i++)
    if(angka % i == 0) {
      return false;
    }
  return true;
}

/// Hitung Bilangan Prima
const hitungPrima = () => lama.filter(angka => apPrima(angka));

/// Hitung Yang Habis Dibagi 3

const hitungBagiTiga = () => lama.filter(angka => angka%3 == 0);

/// Hitung Yang Lebih Dari 636 Jika Dikalikan 3

const hitungLebih = () => lama.filter(angka => angka*17 > 636);

/// Hitung Luas Lingkaran

const hitungLingkaran = () => lama.map(angka => Math.PI * Math.pow(angka, 2));

/// Hitung Luas Persegi

const hitungPersegi = () => lama.map(angka => Math.pow(angka, 2));

/// Hitung Volume Kubus
const hitungKubus = () => lama.map(angka => Math.pow(angka, 3));
