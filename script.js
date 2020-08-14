let lama = [10, 23, 456, 21, 77, 85, 19, 92, 43, 35];

const apPrima = angka => {
  for(let i = 2; i < angka; i++)
    if(angka % i == 0) return false;
  return angka > 1;
}

const hitungPrima = () => lama.filter(angka => apPrima(angka));

///////////////////////////

const hitungBagiTiga = () => lama.filter(angka => angka%3 == 0);

///////////////////////////

const hitungLebih = () => lama.filter(angka => angka*17 > 636);

////////////////////////////////

const hitungLingkaran = () => lama.map(angka => Math.PI * Math.pow(angka, 2));

/////////////////////////////

const hitungPersegi = () => lama.map(angka => Math.pow(angka, 2));

/////////////////////////////
const hitungKubus = () => lama.map(angka => Math.pow(angka, 3));