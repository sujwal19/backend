// scripts and dependencies are important
// import chalk from "chalk";
// //

// console.log(chalk.blue("Hello, world!"));
// console.log(chalk.red.bold("This is an error message."));
// console.log(chalk.green.underline("This is a success message."));

import { program } from "commander";
import fs from "fs";

program
  .name("counter")
  .description("CLI to do file based tasks")
  .version("0.8.0");

program
  .command("count")
  .description("Count the number of lines in a file")
  .argument("./index.js", "file to count")
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();
