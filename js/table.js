import { getItemFromStorage, setItemToStorage } from './istorage.js';
import { modifyItemValue, filterJsonArray } from './arrayutil.js';

export const populateTableKaryawan = (tableKaryawans, dataKaryawans, departementList) => {
  let newTbody = document.createElement("tbody");
  newTbody.setAttribute("id", "karyawan-tbody")
  let karyawans = dataKaryawans;
  let departements = departementList;

  dataKaryawans.forEach(data => {

    let row = newTbody.insertRow(0);

    let nipCell = row.insertCell(0);
    let nameCell = row.insertCell(1);
    let assignDateCell = row.insertCell(2);
    let departementCell = row.insertCell(3);
    let dobCell = row.insertCell(4);
    let delCell = row.insertCell(5);

    let delButton = document.createElement("button");
    delButton.classList.add("btn");
    delButton.classList.add("btn-danger");
    delButton.innerText = "X";
    delButton.addEventListener("click", () => {
      let filtered = karyawans.filter(karyawan => karyawan.nip != data.nip);
      setItemToStorage("karyawan", filtered);
      populateTableKaryawan(tableKaryawans, getItemFromStorage("karyawan"), departements);
      location.reload();
    })

    let departementSelect = document.createElement("select");
    departementSelect.classList.add("custom-select");
    departements.forEach(dept => {
      let departementOption = document.createElement("option");
      departementOption.value = dept;
      departementOption.text = dept;
      dept == data.departement ? departementOption.setAttribute("selected", "") : null;
      departementSelect.add(departementOption);
    });
    departementSelect.addEventListener("change", () => {
      let selectedDepartement = departementSelect.options[departementSelect.selectedIndex].value;
      let departementCapacity = filterJsonArray(getItemFromStorage("departement"), selectedDepartement)[0].capacity;
      let assignedKaryawanCount = getItemFromStorage("karyawan").filter(item => item.departement == selectedDepartement).length;
      if (assignedKaryawanCount < departementCapacity) {
        changeKaryawanDept(karyawans, data.nip, departementSelect.options[departementSelect.selectedIndex].value);
        location.reload();
      } else {
        alert("Kapasitas Departement Sudah Terpenuhi");
        location.reload();
      }
    });

    nipCell.innerText = data.nip;
    nameCell.innerText = data.name;
    assignDateCell.innerText = data.assignDate;
    departementCell.appendChild(departementSelect);
    dobCell.innerText = data.dob;
    delCell.appendChild(delButton);
  });
  tableKaryawans.replaceChild(newTbody, document.getElementById("karyawan-tbody"));
}

export const populateTableDepartement = (tableDepartement, dataDepartements) => {
  let newTbody = document.createElement("tbody");
  newTbody.setAttribute("id", "departement-tbody")
  let departements = dataDepartements;

  dataDepartements.forEach(data => {

    let row = newTbody.insertRow(0);

    let departementCell = row.insertCell(0);
    let capacityCell = row.insertCell(1);
    let delRow = row.insertCell(2);

    let delButton = document.createElement("button");
    delButton.classList.add("btn");
    delButton.classList.add("btn-danger");
    delButton.innerText = "X";
    delButton.addEventListener("click", () => {
      let filtered = departements.filter(departemen => departemen.departement != data.departement);
      setItemToStorage("departement", filtered);
      populateTableDepartement(tableDepartement, filtered);
      location.reload();
    })

    departementCell.innerText = data.departement;
    capacityCell.innerText = data.capacity;
    delRow.appendChild(delButton);
  });
  tableDepartement.replaceChild(newTbody, document.getElementById("departement-tbody"));
}

const changeKaryawanDept = (karyawanArr, nip, newDept) => {
  let newKar = modifyItemValue(karyawanArr, "nip", nip, "departement", newDept);
  setItemToStorage("karyawan", newKar);
}
// const populateTable = (tableToPopulate, arrayToInsert) => {
//   let newTbody = document.createElement("tbody");
//   let datas = arrayToInsert;
//   datas.forEach(data => {
//     let row = newTbody.insertRow(0);
//     for (let i = 0; i < Object.keys(data).length; i++) {
//       row.insertCell(i);
//       row.innerText = Object.keys(data)[i];
//     }
//     let delRow = row.insertCell(-1);
//   });
// }