import { checkAccount } from './login.js';
import { masukParkir, keluarParkir } from './parkir.js';
import { generateChart, totalIncomeChart } from './admin.js';

let loginPage = document.getElementById('login-page');
let header = document.getElementsByTagName('header')[0];
let accName = document.getElementById('account-menu');
let opPage = document.getElementById('operator-page');
let adminPage = document.getElementById('admin-page');
let changePasswordButton = document.getElementById('change-password-button');
let inputOldPassword = document.getElementById('input-old-password');
let inputNewPassword = document.getElementById('input-new-password');
let logoutButton = document.getElementById('logout-button');

let loginForm = document.getElementById('login-form');
let inputNip = document.getElementById('input-nip');
let inputPassword = document.getElementById('input-password');

let inputPlat = document.getElementById('plat-nomor');
let inputTipe = document.getElementById('tipe-kendaraan');
let inputToken = document.getElementById('token-parkir');
let buttonToken = document.getElementById('btn-token');
let buttonBiaya = document.getElementById('btn-biaya');
let displayWaktuMasukToken = document.getElementById('token-waktu-masuk');
let displayToken = document.getElementById('generated-token');
let displayBiaya = document.getElementById('biaya-parkir');
let displayWaktuMasukBiaya = document.getElementById('biaya-waktu-masuk');
let displayWaktuKeluarBiaya = document.getElementById('biaya-waktu-keluar');

let op1Pie = document.getElementById('op1-pie-js');
let op2Pie = document.getElementById('op2-pie-js');
let totalIncomePie = document.getElementById('total-income-pie');

let parkirs = localStorage.getItem('parkirs')
  ? JSON.parse(localStorage.getItem('parkirs'))
  : [];

var ci = setInterval(
  () =>
    (document.getElementById(
      'clock-h1'
    ).innerText = new Date().toLocaleTimeString()),
  1000
);

const totalBiaya = () => {
  let total = [];
  parkirs.forEach(item => {
    total.push(item.biaya);
  });
  return total.reduce((a, b) => parseInt(a) + parseInt(b));
};

const totalDurasi = () => {
  let total = [];
  parkirs.forEach(item => {
    total.push(
      Math.floor(
        Math.abs(parseInt(item.waktuMasuk) - parseInt(item.waktuKeluar)) /
          1000 /
          60
      )
    );
  });
  return total.reduce((a, b) => parseInt(a) + parseInt(b));
};

const totalKendaraan = () => {
  let totalMobil = 0;
  let totalMotor = 0;

  parkirs.forEach(item => {
    item.tipe == 'mobil' ? totalMobil++ : totalMotor++;
  });
  return {
    totalMobil,
    totalMotor,
  };
};

if (localStorage.getItem('loggedUser')) {
  loginPage.classList.add('d-none');
  header.classList.remove('d-none');
  accName.innerText = JSON.parse(localStorage.getItem('loggedUser')).name;
  if (JSON.parse(localStorage.getItem('loggedUser')).role == 'operator') {
    opPage.classList.remove('d-none');
  } else {
    adminPage.classList.remove('d-none');
    generateChart(op1Pie, 'op1');
    generateChart(op2Pie, 'op2');
    totalIncomeChart(totalIncomePie);
    document.querySelector(
      '#total-biaya'
    ).innerText = `Total Income Rp. ${totalBiaya()}`;
    document.querySelector(
      '#total-durasi'
    ).innerText = `Total Durasi Parkir: ${totalDurasi()} Menit`;
    document.querySelector('#total-kendaraan').innerText = `Total kendaraan : ${
      totalKendaraan().totalMobil
    } Mobil & ${totalKendaraan().totalMotor} Motor`;
  }
}

buttonToken.addEventListener('click', () => {
  let tipeKendaraan = inputTipe.options[inputTipe.selectedIndex].value;
  let dataParkir = masukParkir(tipeKendaraan, inputPlat.value, parkirs);

  displayToken.innerText = `Token: ${dataParkir.token}`;
  displayWaktuMasukToken.innerText = `Waktu Masuk: ${dataParkir.waktuMasuk}`;
});

buttonBiaya.addEventListener('click', () => {
  let token = inputToken.value;
  let dataParkir = keluarParkir(token, parkirs);
  displayBiaya.innerText = `Rp. ${dataParkir.biayaParkir} (${dataParkir.menitParkir} Menit)`;
  displayWaktuMasukBiaya.innerText = `Waktu Masuk: ${dataParkir.waktuMasuk}`;
  displayWaktuKeluarBiaya.innerText = `Waktu Keluar: ${dataParkir.waktuKeluar}`;
});

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  if (checkAccount(inputNip.value, inputPassword.value)) {
    loginPage.classList.add('d-none');
    header.classList.remove('d-none');
    accName.innerText = JSON.parse(localStorage.getItem('loggedUser')).name;
    if (JSON.parse(localStorage.getItem('loggedUser')).role == 'operator') {
      opPage.classList.remove('d-none');
    } else {
      adminPage.classList.remove('d-none');
      generateChart(op1Pie, 'op1');
      generateChart(op2Pie, 'op2');
      totalIncomeChart(totalIncomePie);
      document.querySelector(
        '#total-biaya'
      ).innerText = `Total Income Rp. ${totalBiaya()}`;
      document.querySelector(
        '#total-durasi'
      ).innerText = `Total Durasi Parkir: ${totalDurasi()} Menit`;
    }
  } else {
    alert('Salah');
  }
});

changePasswordButton.addEventListener('click', () => {
  let user = JSON.parse(localStorage.getItem('loggedUser'));
  if (inputOldPassword.value == user.password) {
    user.password = inputNewPassword.value;
    localStorage.setItem('loggedUser', JSON.stringify(user));
    let oldKaryawans = JSON.parse(localStorage.getItem('karyawans'));
    let newKaryawans = oldKaryawans.map(item => {
      if (item.nip == user.nip) {
        return user;
      } else {
        return item;
      }
    });
    localStorage.setItem('karyawans', JSON.stringify(newKaryawans));
    logoutButton.click();
  } else {
    alert('Salah');
  }
  location.reload();
});

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('loggedUser');
  clearInterval(ci);
  location.reload();
});

/*
localStorage.setItem("karyawans", '[{"nip":"op1","name":"Operator Satu","password":"123","role":"operator"},{"nip":"op2","name":"Operator Dua","password":"123","role":"operator"},{"nip":"adm1","name":"Admin Satu","password":"123","role":"admin"}]');
localStorage.setItem("parkirs", '[{"token":"12995","tipe":"mobil","plat":"B 123 ZC","waktuMasuk":"1598419686308","waktuKeluar":"1598419700320","biaya":"5000","byNip":"op2"},{"token":"15927","tipe":"mobil","plat":"B 6788 XVC","waktuMasuk":"1598422305993","waktuKeluar":"1598422318071","biaya":"5000","byNip":"op2"},{"token":"80643","tipe":"motor","plat":"B 8737 XVC","waktuMasuk":"1598422319351","waktuKeluar":"1598422324017","biaya":"3000","byNip":"op2"},{"token":"35336","tipe":"motor","plat":"B 7389 HUD","waktuMasuk":"1598422352481","waktuKeluar":"1598422374263","biaya":"3000","byNip":"op1"},{"token":"58149","tipe":"motor","plat":"B 8392 HUD","waktuMasuk":"1598422356866","waktuKeluar":"1598422361725","biaya":"3000","byNip":"op1"},{"token":"19755","tipe":"mobil","plat":"B 8392 JKS","waktuMasuk":"1598422383071","waktuKeluar":"1598422388075","biaya":"5000","byNip":"op1"},{"token":"41412","tipe":"motor","plat":"B 8378 GV","waktuMasuk":"1598422462904","waktuKeluar":"1598422467022","biaya":"3000","byNip":"op1"},{"token":"29940","tipe":"motor","plat":"B 8391 JS","waktuMasuk":"1598422542256","waktuKeluar":"1598422701806","biaya":"4000","byNip":"op1"},{"token":"76930","tipe":"mobil","plat":"B 7648 ZC","waktuMasuk":"1598428022471","waktuKeluar":"1598428408409","biaya":"20000","byNip":"op1"}]');
location.reload();
*/
