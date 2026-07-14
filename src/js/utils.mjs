// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/* NEW FUNCTION getParam(param): returns a URL parameter value
   Example: ?product=880RR → getParam("product") returns "880RR"
-------------------------------------------------------- */
export function getParam(param) {
  const queryString = window.location.search;          // gets "?product=880RR"
  const urlParams = new URLSearchParams(queryString);  // parses the query string
  return urlParams.get(param);                         // returns the value for the requested param
}
