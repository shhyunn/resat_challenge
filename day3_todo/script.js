document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTodoBtn = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");
  const filters = {
    all: document.getElementById("all"),
    completed: document.getElementById("completed"),
    incomplete: document.getElementById("incomplete"),
  };
  const prioritySelect = document.getElementById("priority");

  let todos = [];

  function renderTodos(filter = "all") {
    todoList.innerHTML = "";
    const filteredTodos = todos.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true;
    });

    filteredTodos.forEach((todo) => {
      const li = document.createElement("div");
      li.className = `todo-item ${todo.priority} ${
        todo.completed ? "completed" : ""
      }`;
      li.innerHTML = `
                <input type="checkbox" ${
                  todo.completed ? "checked" : ""
                } class="toggle-completed">
                <span>${todo.text}</span>
                <span style="color: ${getPriorityColor(
                  todo.priority
                )}; font-weight: bold;" class="priority">${getPriorityIcon(
        todo.priority
      )} ${getPriorityLabel(todo.priority)}</span>
                <span>    </span>
                <button style="border: none; color: red; background: none; cursor: pointer;" class="delete">삭제</button>
            `;
      li.querySelector(".toggle-completed").addEventListener("click", () =>
        toggleCompleted(todo)
      );
      li.querySelector(".delete").addEventListener("click", () =>
        deleteTodo(todo)
      );
      todoList.appendChild(li);
    });
  }

  function addTodo() {
    const text = todoInput.value.trim();
    const priority = prioritySelect.value;
    if (text === "") return;
    todos.push({ text, priority, completed: false });
    todoInput.value = "";
    renderTodos();
  }

  function toggleCompleted(todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }

  function deleteTodo(todo) {
    todos = todos.filter((t) => t !== todo);
    renderTodos();
  }

  function getPriorityLabel(priority) {
    switch (priority) {
      case "low":
        return "낮음";
      case "medium":
        return "보통";
      case "high":
        return "높음";
      case "very-high":
        return "아주 높음";
      default:
        return "";
    }
  }

  function setActiveFilter(button) {
    Object.values(filters).forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "low":
        return "green";
      case "medium":
        return "orange";
      case "high":
        return "red";
      case "very-high":
        return "purple";
      default:
        return "";
    }
  }

  function getPriorityIcon(priority) {
    switch (priority) {
      case "low":
        return '<span class="priority-icon priority-low">🟢</span>';
      case "medium":
        return '<span class="priority-icon priority-medium">🟠</span>';
      case "high":
        return '<span class="priority-icon priority-high">🔴</span>';
      case "very-high":
        return '<span class="priority-icon priority-very-high">🟣</span>';
      default:
        return "";
    }
  }

  addTodoBtn.addEventListener("click", addTodo);

  filters.all.addEventListener("click", () => {
    setActiveFilter(filters.all);
    renderTodos("all");
  });

  filters.completed.addEventListener("click", () => {
    setActiveFilter(filters.completed);
    renderTodos("completed");
  });

  filters.incomplete.addEventListener("click", () => {
    setActiveFilter(filters.incomplete);
    renderTodos("incomplete");
  });

  renderTodos();
});
