import { checkAccount } from "./login.js";
import { getItemFromStorage, setItemToStorage } from "./istorage.js";
import { filterJsonArraySqlLike, getDistinctValueList, modifyItemValue } from "./arrayutil.js";
import { populateTableKaryawan, populateTableDepartement } from "./table.js";

let karyawanArr = getItemFromStorage("karyawan");
let departementArr = getItemFromStorage("departement");
let departementList = getDistinctValueList(departementArr, "departement");

let loginForm = document.getElementById("login-form");
let inputNip = document.getElementById("input-nip");
let inputPassword = document.getElementById("input-password");

let accountMenu = document.getElementById("account-menu");
let changePasswordButton = document.getElementById("change-password-button");
let logOutButton = document.getElementById("logout-button");
let oldPasswordInput = document.getElementById("input-old-password")
let newPasswordInput = document.getElementById("input-new-password")

let loginPage = document.getElementById("login-page");
let karyawanNav = document.getElementById("karyawan-nav");
let departementNav = document.getElementById("departemen-nav");

let karyawanPage = document.getElementById("karyawan-page");
let departementPage = document.getElementById("departement-page");

let sortKaryawan = document.getElementById("sort-karyawan");
let sortDepartement = document.getElementById("sort-departement");

let searchKaryawan = document.getElementById("search-karyawan");
let searchDepartement = document.getElementById("search-departemen");

let karyawanNameInput = document.getElementById("input-karyawan-name");
let karyawanDobInput = document.getElementById("input-karyawan-dob");
let addKaryawanButton = document.getElementById("add-karyawan-button");

let departementNameInput = document.getElementById("input-departement-name");
let departementCapacityInput = document.getElementById("input-departement-capacity");
let addDepartementButton = document.getElementById("add-departement-button");

let karyawanTable = document.getElementById("table-karyawan");
let departementTable = document.getElementById("table-departement");

if (getItemFromStorage("loggedUser") != null && getItemFromStorage("loggedUser") != "") {
  loginPage.classList.add("hide-el");
  document.getElementsByTagName("header")[0].classList.remove("hide-el");
  accountMenu.innerText = getItemFromStorage("loggedUser").name;
  karyawanPage.classList.remove("hide-el");
  populateTableKaryawan(karyawanTable, karyawanArr, departementList);
}

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  if (checkAccount(inputNip.value.toString(), inputPassword.value.toString())) {
    loginPage.classList.add("hide-el");
    document.getElementsByTagName("header")[0].classList.remove("hide-el");
    accountMenu.innerText = getItemFromStorage("loggedUser").name;
    karyawanPage.classList.remove("hide-el");
    populateTableKaryawan(karyawanTable, karyawanArr, departementList);
  } else {
    alert("NIP Atau Password Tidak Terdaftar");
  }
});

karyawanNav.addEventListener("click", e => {
  e.preventDefault();
  karyawanPage.classList.remove("hide-el");
  departementPage.classList.add("hide-el");
  populateTableKaryawan(karyawanTable, karyawanArr, departementList);
});

departementNav.addEventListener("click", e => {
  e.preventDefault();
  karyawanPage.classList.add("hide-el");
  departementPage.classList.remove("hide-el");
  populateTableDepartement(departementTable, departementArr);
});

sortKaryawan.addEventListener("change", e => {
  e.preventDefault();
  let colToSort = sortKaryawan.value;
  switch (colToSort) {
    case "nipAsc":
      karyawanArr.sort((item1, item2) => parseInt(item2.nip) - parseInt(item1.nip));
      populateTableKaryawan(karyawanTable, karyawanArr, departementList);
      break;
    case "nipDesc":
      karyawanArr.sort((item1, item2) => parseInt(item1.nip) - parseInt(item2.nip));
      populateTableKaryawan(karyawanTable, karyawanArr, departementList);
      break
    case "namaAsc":
      karyawanArr.sort((item1, item2) => item2.name.localeCompare(item1.name));
      populateTableKaryawan(karyawanTable, karyawanArr, departementList);
      break;
    case "namaDesc":
      karyawanArr.sort((item1, item2) => item1.name.localeCompare(item2.name));
      populateTableKaryawan(karyawanTable, karyawanArr, departementList);
      break;
    case "assignAsc":
      karyawanArr.sort((item1, item2) => item2.assignDate.localeCompare(item1.assignDate));
      populateTableKaryawan(karyawanTable, karyawanArr, departementList);
      break;
    case "assignDesc":
      karyawanArr.sort((item1, item2) => item1.assignDate.localeCompare(item2.assignDate));
      populateTableKaryawan(karyawanTable, karyawanArr, departementList);
      break;
    case "deptAsc":
      karyawanArr.sort((item1, item2) => item2.departement.localeCompare(item1.departement));
      populateTableKaryawan(karyawanTable, karyawanArr, departementList);
      break;
    case "deptDesc":
      karyawanArr.sort((item1, item2) => item1.departement.localeCompare(item2.departement));
      populateTableKaryawan(karyawanTable, karyawanArr, departementList);
      break;
    case "dobAsc":
      karyawanArr.sort((item1, item2) => item2.dob.localeCompare(item1.dob));
      populateTableKaryawan(karyawanTable, karyawanArr, departementList);
      break;
    case "dobDesc":
      karyawanArr.sort((item1, item2) => item1.dob.localeCompare(item2.dob));
      populateTableKaryawan(karyawanTable, karyawanArr, departementList);
      break;
    default:
      karyawanArr.sort((item1, item2) => item2.nama.localeCompare(item1.nama));
      break;
  }
});

sortDepartement.addEventListener("change", e => {
  e.preventDefault();
  let colToSort = sortDepartement.value;
  switch (colToSort) {
    case "deptAsc":
      departementArr.sort((item1, item2) => item2.departement.localeCompare(item1.departement));
      break;
    case "deptDesc":
      departementArr.sort((item1, item2) => item1.departement.localeCompare(item2.departement));
      break;
    case "capAsc":
      departementArr.sort((item1, item2) => parseInt(item2.capacity) - parseInt(item1.capacity));
      break;
    case "capDesc":
      departementArr.sort((item1, item2) => parseInt(item1.capacity) - parseInt(item2.capacity));
      break;
    default:
      departementArr.sort((item1, item2) => item2.departement.localeCompare(item1.departement));
      break;
  }
  populateTableDepartement(departementTable, departementArr);
});

searchKaryawan.addEventListener("input", () => {
  let textInput = searchKaryawan.value.toString();
  let newArr = filterJsonArraySqlLike(textInput, karyawanArr);
  populateTableKaryawan(karyawanTable, newArr, departementList);
});

searchDepartement.addEventListener("input", () => {
  let textInput = searchDepartement.value.toString();
  let newArr = filterJsonArraySqlLike(textInput, departementArr);
  populateTableDepartement(departementTable, newArr)
});

addKaryawanButton.addEventListener("click", () => {
  if (karyawanNameInput.value.toString() != "" && karyawanDobInput.value.toString() != "") {
    let newNip = Math.floor(Math.random() * 1000000000000)
    let newKaryawan = {
      nip: newNip.toString(),
      name: karyawanNameInput.value.toString(),
      assignDate: new Date().toLocaleDateString(),
      departement: "DIRUMAHKAN",
      dob: karyawanDobInput.value ? new Date(karyawanDobInput.value).toLocaleDateString() : new Date().toLocaleDateString(),
      password: newNip
    };
    karyawanArr.push(newKaryawan);
    setItemToStorage("karyawan", karyawanArr);
    populateTableKaryawan(karyawanTable, karyawanArr, departementList);
    location.reload();
  } else {
    alert("Nama & DoB Karyawan Tidak Boleh Kosong");
  }
});

addDepartementButton.addEventListener("click", () => {
  if (departementNameInput.value.toString() != "" && departementCapacityInput.value.toString() != "") {
    let newDepartement = {
      departement: departementNameInput.value.toString(),
      capacity: departementCapacityInput.value.toString()
    };
    departementArr.push(newDepartement);
    setItemToStorage("departement", departementArr);
    populateTableDepartement(departementTable, departementArr);
    location.reload();
  } else {
    alert("Departement & Capacity Tidak Boleh Kosong");
  }
});

changePasswordButton.addEventListener("click", () => {
  let user = getItemFromStorage("loggedUser");
  if (oldPasswordInput.value.toString() == user.password) {
    user.password = newPasswordInput.value.toString();
    setItemToStorage("loggedUser", user);
    karyawanArr = modifyItemValue(karyawanArr, "nip", user.nip, "password", user.password);
    setItemToStorage("karyawan", karyawanArr);
    location.reload();
  } else {
    alert("Old Password Salah")
  }
});

logOutButton.addEventListener("click", () => {
  setItemToStorage("loggedUser", []);
  location.reload();
});

/*
let karyawan = [
  {
    nip: "90275748473",
    name: "Karyawan Satu",
    assignDate: "10/08/2020",
    departement: "IT Departement",
    dob: "10/10/1990",
    password: "90275748473"
  },
  {
    nip: "90254988473",
    name: "Karyawan Dua",
    assignDate: "11/08/2020",
    departement: "HR Departement",
    dob: "11/11/1911",
    password: "90254988473"
  },
  {
    nip: "90213028473",
    name: "Karyawan Tiga",
    assignDate: "12/08/2020",
    departement: "Marketing Departement",
    dob: "12/12/1912",
    password: "90213028473"
  },
  {
    nip: "90287028473",
    name: "Karyawan Empat",
    assignDate: "13/08/2020",
    departement: "Accounting Departement",
    dob: "13/01/1901",
    password: "90213028473"
  }
];

let departement = [
  {
    departement: "DIRUMAHKAN",
    capacity: "100"
  },
  {
    departement: "HR Departement",
    capacity: "2"
  },
  {
    departement: "Marketing Departement",
    capacity: "2"
  },

  {
    departement: "Accounting Departement",
    capacity: "2"
  },
  {
    departement: "IT Departement",
    capacity: "2"
  }
];

localStorage.setItem("karyawan", JSON.stringify(karyawan));
localStorage.setItem("departement", JSON.stringify(departement));
location.reload();
*/