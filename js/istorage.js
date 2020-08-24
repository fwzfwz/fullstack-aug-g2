export const getItemFromStorage = itemKey => {
  let item = localStorage.getItem(itemKey);
  if(item == null || item == []) {
    return [];
  } else {
    return JSON.parse(item);
  }
}

export const setItemToStorage = (itemKey, itemValue) => {
  let stringifiedItem = JSON.stringify(itemValue);
  localStorage.setItem(itemKey, stringifiedItem);
}