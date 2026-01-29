import url from "url";

const urlString = "https://www.google.com/search?q=hello+world";

// URL Object
const urlObj = new URL(urlString);
// console.log(urlObj);
// console.log(urlObj.pathname);

// format()
// console.log(url.format(urlObj));

// import.meta.url - file URL
// console.log(import.meta.url);

// fileURLToPath
// console.log(url.fileURLToPath(import.meta.url));

//
const params = new URLSearchParams(urlObj.search);
console.log(params);
// console.log(params.get("q"));

// add params
params.append("limit", "120");
console.log(params);

// delete params
params.delete("limit");
console.log(params);
