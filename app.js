/*  TODO: 
    light and dark mode
    display of time
    display different background color depending on time of day
    CRUD operations
    sorting elements using the dropdown -- use filter to display
    set deadline of todo-list, but optional
*/

const todoArr = [
    { id: 1, text: "Prepare supper", completed: false },
    { id: 2, text: "Wash dishes", completed: false },
    { id: 3, text: "Write novel", completed: false },
];

function displayTodos(todos) {
    todos = [...todoArr];
    todos.forEach((todo) => displayTodo(todo));
}

function displayTodo(todo) {
    const ulElement= document.querySelector(".list-group");
    const liElement = document.createElement("li");
    liElement.className = "list-group-item list-group-item-action d-flex align-items-center justify-content-between";

    liElement.innerHTML = `
    <div class="checkbox-text form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="check-task"
              data-target="${todo.id}"
            />
            <label class="form-check-label" id="text" for="checkTodo"
              >${todo.text}</label
            >
          </div>
          <div class="list-actions">
            <a class="btn btn-sm btn-primary update"><i class="bi bi-pencil"></i></a>
            <a class="btn btn-sm btn-danger delete" href="javascript:void(0)">
                X
            </a>
          </div>`;
    ulElement.appendChild(liElement);
}

function deleteTodo(element) {
    if(element.classList.contains("delete")) {
        element.parentElement.parentElement.remove();
        showAlert("Deleted task!", "success");
    }
}

function checkTodo(element) {
    element.parentElement.parentElement.classList.toggle("text-muted");
}

function showAlert(message, className) {
    const divAlert = document.createElement("div");
    divAlert.className = `alert alert-${className}`;
    divAlert.appendChild(document.createTextNode(message));
    const main = document.querySelector("#main");
    const form = document.querySelector("form");
    main.insertBefore(divAlert, form);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

function clearTodoInput() {
    document.querySelector("#input-list").value = "";
}

document.addEventListener("DOMContentLoaded", displayTodos);
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const inputText = document.querySelector("#input-list").value;

    if(inputText === "") {
        showAlert("Please fill in the field!", "danger");
    } else {
        const todo = {
            id: Math.floor(Math.random() * 100),
            text: inputText,
            completed: false,
        };
        displayTodo(todo);
        showAlert("Added task!", "success")
        clearTodoInput();
    }
});
document.querySelector(".list-group").addEventListener("click", (event) => {
    deleteTodo(event.target);
});

document.querySelector(".list-group").addEventListener("click", (event) => {
    checkTodo(event.target);
});