// step 1:
var todoList = {
  todos: [],
  // add a new todo
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  // delete todo
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  // change todo
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  // toggle completed
  toggleCompleted: function (position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function () {
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    // get number of completed todos
    this.todos.forEach(function (todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function (todo) {
      // case 1: if everything is true, make everything false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        // case 2: otherwise make everything true
        todo.completed = true;
      }
    });
  }
};

/* step 2  getting data from inputs */
const handlers = {
  toggleAll: function () {
    todoList.toggleAll();
    // show on the website
    view.displayTodos();
  },
  addTodo: function () {
    const addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    // show on the website
    view.displayTodos();
  },
  changeTodo: function () {
    const changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
    const changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    // show on the website
    view.displayTodos();
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    // show on the website
    view.displayTodos();
  },
  toggleTodo: function () {
    const toggleCompletedInput = document.getElementById('toggleCompletedInput');
    todoList.toggleCompleted(toggleCompletedInput.valueAsNumber);
    toggleCompletedInput.value = "";
    // show on the website
    view.displayTodos();
  }
};

// step 3 escape from the console show on page
const view = {
  // display todo list on the website
  displayTodos: function () {
    let todosUl = document.querySelector('ul');
    todosUl.textContent = '';

    todoList.todos.forEach(function (todo, position) {
      let todoLi = document.createElement('li');
      let todoTextWithCompletion = "";

      if (todo.completed === true) {
        todoTextWithCompletion = "(x) " + todo.todoText;
      } else {
        todoTextWithCompletion = "() " + todo.todoText;
      }

      // each li should have an id that has todo position
      todoLi.id = position;
      // each li should include completion text
      todoLi.textContent = todoTextWithCompletion;
      // there should be a delete button for each todo
      todoLi.appendChild(this.createDeleteButton());
      // append li to ul
      todosUl.appendChild(todoLi)
      // this will equal to the callback
    }, this)
  },
  // create the delete button
  createDeleteButton: function () {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function () {
    // delete button should have access to the todo id
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function (event) {
      // get the element that was clicked on.
      var elementClicked = event.target;
      // check if elementClicked is a delete button
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

// call this method for it to work
view.setUpEventListeners();