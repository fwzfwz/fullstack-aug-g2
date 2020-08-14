export function getItemFromStorage(key) {
  let item = localStorage.getItem(key);
  if (item == null || item == "[]") {
    return [];
  } else {
    return JSON.parse(item);
  }
}

export function setItemToStorage(itemKey, itemToSet) {
  let stringifiedArray = JSON.stringify(itemToSet);
  localStorage.setItem(itemKey, stringifiedArray);
}

// export function searchFromJsonItem(itemKey, jsonKeyToSearch, jsonValueToSearch) {
//   let key = jsonKeyToSearch;
//   let json = getItemFromStorage(itemKey);
//   for (let i = 0; i < json.lengh; i++) {
//     let item = json[i];
//     if (json[i].key == jsonValueToSearch) {
//       return json[i];
//     }
//   }
// }

// export function removeFromJsonItem(itemKey, jsonKeyToSearh, jsonValueToSearch) {
//   let item = getItemFromStorage(itemKey);
//   item.filter((json) => json.jsonKeyToSearh != jsonValueToSearch);
//   setItemToStorage(itemKey, item)
// }