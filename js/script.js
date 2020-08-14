let tamus = [];
let inputNik = document.getElementById("nik");
let inputName = document.getElementById("name");
let inputPic = document.getElementById("pic");
let inputKepentingan = document.getElementById("kepentingan");

function populateTable() {
  populateTamus();

  let tbody = document.createElement("tbody");

  if (!tamus.length) {
    alert("Daftar Kosong");
    changePageTo("input");
  } else {
    tamus.forEach((tamu) => {
      let row = tbody.insertRow(0);

      let nikCell = row.insertCell(0);
      let namaCell = row.insertCell(1);
      let picCell = row.insertCell(2);
      let kepentinganCell = row.insertCell(3);
      let delRow = row.insertCell(4);

      nikCell.innerHTML = tamu.nik;
      namaCell.innerHTML = tamu.name;
      picCell.innerHTML = tamu.pic;
      kepentinganCell.innerHTML = tamu.kepentingan;
      delRow.innerHTML = "X";
      delRow.addEventListener("click", () => remRow(nikCell.innerText));
    });
    document.getElementById("daftar").replaceChild(tbody, document.getElementById("daftar").getElementsByTagName("tbody")[0]);

  }

  tamus = [];
}

function addTamu() {
  let newTamu = {
    nik: inputNik.value,
    name: inputName.value,
    pic: inputPic.value,
    kepentingan: inputKepentingan.value
  }

  populateTamus();

  if (!inputNik.value || !inputName.value || !inputPic.value || !inputKepentingan.value) {
    alert("Semua Field Harus Di Isi");
  } else if (!tamus.length) {
    tamus.push(newTamu);
    localStorage.setItem("tamus", JSON.stringify(tamus));
    clearText();
  } else {
    if (!tamus.some((tamu) => tamu.nik == inputNik.value)) {
      tamus.push(newTamu);
      localStorage.setItem("tamus", JSON.stringify(tamus));
      clearText();
    } else {
      alert("NIK Sudah Terdaftar");
    }
  }
}

function clearText() {
  inputNik.value = "";
  inputName.value = "";
  inputPic.value = "";
  inputKepentingan.value = "";
}

function clearTbody() {
  let tbody = document.getElementsByTagName("tbody")[0];
  for (let i = 0; i < tbody.children.length; i++) {
    tbody.deleteRow(i);
  }
}

function populateTamus() {
  let storage = JSON.parse(localStorage.getItem("tamus"));
  if (storage != null) {
    tamus = JSON.parse(localStorage.getItem("tamus"));
  } else {
    tamus = [];
  }
}

function hapusDaftar() {
  if (confirm("Apakah Anda Ingin Menghapus Data & Kembali Ke Form Input?")) {
    localStorage.clear();
    changePageTo("input");
  }
}

function remRow(id) {
  tamus = JSON.parse(localStorage.getItem("tamus"));
  let filtered = tamus.filter((tamu) => tamu.nik != id);
  tamus = filtered;
  localStorage.setItem("tamus", JSON.stringify(tamus));
  populateTable();
}

function changePageTo(page) {
  let inputPage = document.getElementById("input-tamu");
  let daftarPage = document.getElementById("daftar-tamu");

  if (page == "daftar") {
    if (tamus.length) {
      inputPage.style.display = "none";
      daftarPage.style.display = "block";
      populateTable();
    } else {
      alert("Daftar Kosong");
    }
  } else if (page == "input") {
    daftarPage.style.display = "none";
    inputPage.style.display = "block";
  }
}