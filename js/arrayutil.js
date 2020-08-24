export const filterJsonArray = (arrayToSearch, valueToSearch) => {
  return arrayToSearch.filter(item => {
    for (let key in item) {
      if (item[key] == valueToSearch) {
        return true;
      }
    }
  })
};

export const indexOfJsonArray = (arrayToSearch, valueToSearch) => {
  return arrayToSearch.findIndex(item => {
    for (let key in item) {
      if (item[key] == valueToSearch) {
        return true;
      }
    }
  });
}

export const modifyItemValue = (arrayToModify, itemUniqueKey, itemUniqueValue, itemValueKey, newValue) => {
  let modifiedArray = arrayToModify;
  modifiedArray.forEach(item => {
    if (item[itemUniqueKey] == itemUniqueValue) {
      item[itemValueKey] = newValue;
    }
  });
  return modifiedArray;
}

export const getDistinctValueList = (arrayToSearch, jsonKey) => {
  let distinctValue = new Set();
  arrayToSearch.forEach(item => {
    distinctValue.add(item[jsonKey]);
  });
  return distinctValue;
}

export const filterJsonArraySqlLike = (stringToSearch, arrayToSearch) => {
  return arrayToSearch.filter(item => {
    for (let key in item) {
      if (item[key].toString().toLowerCase().indexOf(stringToSearch.toLowerCase()) >= 0) {
        return true;
      }
    }
  })
};