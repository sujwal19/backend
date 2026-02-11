import { log } from "console";
import crypto from "crypto";

// createHash()
const hash = crypto.createHash("sha256");
hash.update("sujwal@1");
// log(hash.digest("base64"));

// randomBytes()
crypto.randomBytes(16, (err, buff) => {
  if (err) throw err;
  //   log(buff.toString("hex"));
});

// createCipherviv & createDecipheriv
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update("Hello this is a secret Message", "urf8", "hex");
encrypted += cipher.final("hex");
log(encrypted);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");
log(decrypted);
// console.log(cipher);
