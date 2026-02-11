// import fs from "fs";

// // readFile - Callback
// fs.readFile("./test.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// // readFileSync - Synchronous Version
// const data = fs.readFileSync("./test.txt", "utf8");
// console.log(data);

// readFile - Promise .then()
import fs from "fs/promises";

// fs.readFile("./test.txt", "utf8")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// readFile() - async/await
const readFile = async () => {
  try {
    const data = await fs.readFile("./test.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// writeFile
const writeFile = async () => {
  try {
    await fs.writeFile("./test.txt", "Hello Node on test file", "utf8");
    console.log("File written to...");
  } catch (err) {
    console.log(err);
  }
};

// appendFile
const appendFile = async () => {
  try {
    await fs.appendFile(
      "./test.txt",
      "\nThis will be appened on buttom",
      "utf8",
    );
    console.log("File Appended...");
  } catch (error) {
    console.log(error);
  }
};

writeFile();
appendFile();
readFile();
