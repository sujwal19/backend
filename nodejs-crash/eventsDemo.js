import { log } from "console";
import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

log(myEmitter);

function greetHandler() {
  log("Hello World");
}

function goodbyeHandler() {
  log("Goodbye World");
}

greetHandler();
