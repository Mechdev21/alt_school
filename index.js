window.addEventListener("DOMContentLoaded", (event) => {

    const taskName = document.getElementById("task-name");
    const taskDescription = document.getElementById("task-description");
    const button = document.getElementById("add-todo");
    const listContainer = document.getElementById("lists");
  
    const taskArray = [
      { nameOfTask: "cook food", taskDescription: "try cook rice" },
      { nameOfTask: "cook meat", taskDescription: "make it spicy" },
    ];
  
    addTodo();
  
    function addTodo() {
      if (taskName.value === "" || taskDescription.value === "") {
        alert("Please fill this form!");
        return;
      }
      const newTask = {
        nameOfTask: taskName.value,
        taskDescription: taskDescription.value,
      };
  
      taskArray.push(newTask);
      console.log(taskArray.length);
      taskName.value = "";
      taskDescription.value = "";
      displayTodo(); // Call displayTodo after adding a new task
    }
  
    const deleteTodo = (e) => {
      const targetEle = e.target;
      let selector = "delete";
      if (targetEle.className === selector) {
        const index = taskArray.findIndex(task => task.nameOfTask === targetEle.parentNode.querySelector('.todo-item').textContent.trim());
        listContainer.removeChild(targetEle.parentNode);
        taskArray.splice(index, 1);
      }
    };
  
    const editTodo = (e) => {
      const targetEle = e.target;
      if (targetEle.className === 'edit') {
        const taskToEdit = targetEle.parentNode.querySelector('.todo-item').textContent.trim();
        const newTaskName = prompt("Enter new task name:");
        if (newTaskName !== null && newTaskName !== "") {
          const index = taskArray.findIndex(task => task.nameOfTask === taskToEdit);
          taskArray[index].nameOfTask = newTaskName;
          displayTodo();
        }
      }
    };
  
    const displayTodo = () => {
      listContainer.innerHTML = "";
      for (let index = 0; index < taskArray.length; index++) {
        const itemDiv = document.createElement("div");
        const li = document.createElement("li");
        itemDiv.setAttribute("class", "item");
        li.setAttribute("class", "todo-item");
        li.textContent = taskArray[index].nameOfTask;
        listContainer.appendChild(itemDiv);
        itemDiv.appendChild(li);
  
        const editBtn = document.createElement("button");
        editBtn.className = "edit";
        editBtn.textContent = "Edit";
        itemDiv.appendChild(editBtn);
  
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        itemDiv.appendChild(deleteBtn);
      }
    };
  
    button.addEventListener("click", () => {
      addTodo();
    });
  
    listContainer.addEventListener("click", deleteTodo);
    listContainer.addEventListener("click", editTodo); // Add event listener for editing tasks
  });
  