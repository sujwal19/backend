import { log } from "console";
import { EventEmitter } from "events";

const myEmitter = new EventEmitter();
// log(myEmitter);

function greetHandler(name) {
  log("Hello", name);
}

function goodbyeHandler(name) {
  log("Goodbye " + name);
}

// Register event Listener
myEmitter.on("greet", greetHandler);
myEmitter.on("goodbye", goodbyeHandler);

// Emit events
myEmitter.emit("greet", "Sujwal");
myEmitter.emit("goodbye", "Erwin");

// Error Handling
myEmitter.on("error", (err) => {
  console.log("An error occured: ", err);
});

myEmitter.emit("error", new Error("Something went wrong"));
