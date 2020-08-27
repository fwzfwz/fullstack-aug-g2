export const masukParkir = (tipeKendaraan, inputPlat, parkirs) => {
  let token = Math.floor(Math.random() * 100000);
  let waktuMasuk = Date.now().toString();
  let parkir = {
    token: token.toString(),
    tipe: tipeKendaraan,
    plat: inputPlat,
    waktuMasuk: waktuMasuk,
    waktuKeluar: null,
    biaya: null,
    byNip: JSON.parse(localStorage.getItem('loggedUser')).nip,
  };
  parkirs.push(parkir);
  localStorage.setItem('parkirs', JSON.stringify(parkirs));
  return {
    waktuMasuk: new Date(parseInt(waktuMasuk)).toLocaleTimeString(),
    token: token,
  };
};

export const keluarParkir = (token, parkirs) => {
  let parkir = JSON.parse(localStorage.getItem('parkirs')).filter(
    parkir => parkir.token == token
  )[0];
  let waktuKeluarEpoch = Date.now();
  let waktuElapsed = Math.floor(
    Math.abs(parseInt(parkir.waktuMasuk) - parseInt(waktuKeluarEpoch)) /
      1000 /
      60
  );
  let biayaParkir = 0;
  if (parkir.tipe == 'mobil') {
    if (waktuElapsed <= 1) {
      biayaParkir = 5000;
    } else {
      biayaParkir = 5000;
      biayaParkir += (waktuElapsed - 1) * 3000;
    }
  } else {
    if (waktuElapsed <= 1) {
      biayaParkir = 3000;
    } else {
      biayaParkir = 3000;
      biayaParkir += (waktuElapsed - 1) * 1000;
    }
  }
  parkirs.map(parkir => {
    if (parkir.token == token) {
      parkir.waktuKeluar = Date.now().toString();
      parkir.biaya = biayaParkir.toString();
    }
  });
  localStorage.setItem('parkirs', JSON.stringify(parkirs));
  return {
    waktuMasuk: new Date(parseInt(parkir.waktuMasuk)).toLocaleTimeString(),
    waktuKeluar: new Date(parseInt(waktuKeluarEpoch)).toLocaleTimeString(),
    biayaParkir: biayaParkir,
    menitParkir: waktuElapsed,
  };
};
