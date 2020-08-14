import { getItemFromStorage, setItemToStorage } from './istorage.js';

export function populateTable(tableToPopulate, datas) {
  let newTbody = document.createElement("tbody");
  let tamus = datas;
  datas.forEach((data) => {
    let row = newTbody.insertRow(0);

    let nikCell = row.insertCell(0);
    let namaCell = row.insertCell(1);
    let picCell = row.insertCell(2);
    let kepentinganCell = row.insertCell(3);
    let delRow = row.insertCell(4);

    nikCell.innerText = data.nik;
    namaCell.innerText = data.name;
    picCell.innerText = data.pic;
    kepentinganCell.innerText = data.kepentingan;
    delRow.innerHTML = '<button class="btn btn-danger">X</button>';
    delRow.addEventListener("click", () => {
      let filtered = tamus.filter((item) => item.nik != data.nik);
      setItemToStorage("tamus", filtered);
      populateTable(tableToPopulate, getItemFromStorage("tamus"));
    });
  });
  tableToPopulate.replaceChild(newTbody, tableToPopulate.getElementsByTagName("tbody")[0]);

  // datas = [];
}

export function clearTable() {
  // localStorage.clear();
  setItemToStorage("tamus", []);
  //
  //
  //
  //
  /*
             */
}

export function filterFromArray(arrayToFilter) {
  tamus = getItemFromStorage("tamus");
  let filtered = tamus.filter((tamu) => tamu.nik != id);
  tamus = filtered;
  // setItemToStorage("tamus", tamus);
}