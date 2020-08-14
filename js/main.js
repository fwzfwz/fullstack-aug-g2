import { getItemFromStorage, setItemToStorage } from "./istorage.js";
import changePage from "./changepage.js";
import { populateTable, clearTable } from "./table.js";

let tamus = [];
let inputNik = document.getElementById("nik");
let inputName = document.getElementById("name");
let inputPic = document.getElementById("pic");
let inputKepentingan = document.getElementById("kepentingan");

let inputSearch = document.getElementById("search-input");
let searchButton = document.getElementById("search-nik");
let clearSearch = document.getElementById("clear-search");

let inputPage = document.getElementById("input-tamu");
let daftarPage = document.getElementById("daftar-tamu");

document.getElementById("input-nav").addEventListener("click", () => changePageTo("input"));
document.getElementById("daftar-nav").addEventListener("click", () => changePageTo("daftar"));
document.getElementById("pesan").addEventListener("click", () => addTamu());
document.getElementById("hapus-daftar").addEventListener("click", () => hapusDaftar());
inputSearch.addEventListener("input", () => {
  if (inputSearch.value == null || inputSearch.value == "") {
    clearSearch.style.display = "none";
    tamus = getItemFromStorage("tamus");
    populateTable(document.getElementById("daftar"), tamus);
  } else {
    clearSearch.style.display = "inline";
  }
})
searchButton.addEventListener("click", () => searchTable());
clearSearch.addEventListener("click", () => {
  inputSearch.value = "";
  searchTable();
  clearSearch.style.display = "none";
});

function changePageTo(page) {
  tamus = getItemFromStorage("tamus");
  if (page == "daftar") {
    if (!tamus.length) {
      alert("Daftar Kosong");
    } else {
      changePage(inputPage, daftarPage);
      populateTable(document.getElementById("daftar"), tamus);
    }
  } else if (page == "input") {
    changePage(daftarPage, inputPage);
  }
}

function addTamu() {
  let newTamu = {
    nik: inputNik.value,
    name: inputName.value,
    pic: inputPic.value,
    kepentingan: inputKepentingan.options[inputKepentingan.selectedIndex].text,
  }

  tamus = getItemFromStorage("tamus");

  if (!inputNik.value || !inputName.value || !inputPic.value) {
    alert("Semua Field Harus Di Isi");
  } else {
    if (parseInt(inputNik.value, 10) && inputNik.value.length == 2) {
      if (!tamus.length) {
        tamus.push(newTamu);
        setItemToStorage("tamus", tamus);
        clearText();
      } else {
        if (!tamus.some((tamu) => tamu.nik == inputNik.value)) {
          tamus.push(newTamu);
          setItemToStorage("tamus", tamus);
          clearText();
        } else {
          alert("NIK Sudah Terdaftar");
        }
      }
    } else {
      alert("NIK Harus Berupa Angka 16 Karakter");
      inputNik.focus();
    }
  }
}

function hapusDaftar() {
  if (confirm("Apakah Anda Ingin Menghapus Data & Kembali Ke Form Input?")) {
    clearTable();
    changePageTo("input");
  }
}

function clearText() {
  inputNik.value = "";
  inputName.value = "";
  inputPic.value = "";
}

function searchTable() {
  tamus = getItemFromStorage("tamus");
  if (inputSearch.value != "") {
    let temp = tamus.filter((tamu) => tamu.nik == inputSearch.value);
    populateTable(document.getElementById("daftar"), temp);
  } else {
    populateTable(document.getElementById("daftar"), tamus);
  }
}
