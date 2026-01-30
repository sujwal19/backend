var QRCode = require("qrcode");
let data = {
  name: "Sujwal",
  id: 28,
  email: "sujwal12@gmail.com",
};

// display qrcode in terminal
let stJson = JSON.stringify(data);
QRCode.toString(stJson, { type: "terminal" }, (err, code) => {
  if (err) console.log(err);
  console.log(code);
});

// base64 text
QRCode.toDataURL(stJson, (err, code) => {
  if (err) console.log(err);
  console.log(code);
});

// return qrcode image
QRCode.toFile("qrcode.png", stJson, (err) => {
  if (err) console.log(err);
});
