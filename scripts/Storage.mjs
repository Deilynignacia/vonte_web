// Get from LocalStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Save to LocalStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}