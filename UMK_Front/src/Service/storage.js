function setCookie(name, value, days = 60) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function removeCookie(name) {
  setCookie(name, "", -10);
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

export const StorageService = {
  setCookie,
  getCookie,
  removeCookie,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
};
