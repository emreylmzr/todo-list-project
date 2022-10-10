const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    document.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

}

function clearAllTodos(e) {
    if (confirm("Bütün todoları silmek ister misiniz?")) {

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }

}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi...");
    }

}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1) {

            listItem.setAttribute("style", "display:none !important");
        }

        else {

            listItem.setAttribute("style", "display: block");
        }


    });

}

function deleteTodoFromStorage(deletetodo) {

    let todos = getTodosFromStorage();

    todos.forEach(function (todo, index) {

        if (todo === deletetodo) {

            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}


function loadAllTodosToUI() {

    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);

    })

}


function addTodo(e) {

    const newTodo = todoInput.value.trim();


    if (newTodo === "") {

        showAlert("danger", "Lütfen bir todo girin...")
    }

    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo başarıyla eklendi.");
    }

    e.preventDefault();
}

function getTodosFromStorage(newTodo) {

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {

        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(function () {
        alert.remove();
    }, 1000);
}

function addTodoToUI(newTodo) {

    const listItem = document.createElement("li");

    //link

    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class= 'fa fa-remove'</i>";
    listItem.className = "list-group-item d-flex justify-content-between";

    //Text Node Todo

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //item ekleme

    todoList.appendChild(listItem);

    todoInput.value = "";
}