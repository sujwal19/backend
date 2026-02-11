const fs = require("fs");
const { Command } = require("commander");

const TODOS_FILE = "todos.json";

// Read todos from file, return empty array if file doesn't exist
function readTodos() {
  try {
    const data = fs.readFileSync(TODOS_FILE, "utf8");
    const todos = JSON.parse(data);
    // Keep only valid tasks
    return todos.filter((t) => t && typeof t.task === "string");
  } catch (err) {
    return [];
  }
}

// Write todos to file
function writeTodos(todos) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}

const program = new Command();
program.name("todo").description("CLI file-based todo app").version("1.0.0");

// Add a new todo
program
  .command("add")
  .description("Add a new todo")
  .argument("<task>", "task description")
  .action((task) => {
    const todos = readTodos();
    const lastId = todos.length ? Math.max(...todos.map((t) => t.id || 0)) : 0;
    const id = lastId + 1;

    todos.push({ id, task, completed: false });
    writeTodos(todos);
    console.log(`Added task ${id}: "${task}"`);
  });

// List all todos
program
  .command("list")
  .description("List all todos")
  .action(() => {
    const todos = readTodos();
    if (!todos.length) {
      console.log("No tasks found!");
      return;
    }
    todos.forEach((t) => {
      console.log(`${t.id}. [${t.completed ? "✅" : "❌"}] ${t.task}`);
    });
  });

// Mark a todo as done
program
  .command("done")
  .description("Mark a todo as done")
  .argument("<id>", "task ID")
  .action((id) => {
    const todos = readTodos();
    const task = todos.find((t) => t.id === parseInt(id));
    if (!task) {
      console.log("Task not found!");
      return;
    }
    task.completed = true;
    writeTodos(todos);
    console.log(`Task ${id} marked as done.`);
  });

// Remove a todo
program
  .command("remove")
  .description("Remove a todo")
  .argument("<id>", "task ID")
  .action((id) => {
    const todos = readTodos();
    const newTodos = todos.filter((t) => t.id !== parseInt(id));
    if (newTodos.length === todos.length) {
      console.log("Task not found!");
      return;
    }
    writeTodos(newTodos);
    console.log(`Task ${id} removed.`);
  });

program.parse();
