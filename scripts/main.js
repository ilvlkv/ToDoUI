const taskStorage = [];

let task_high__id = "high_task__id_";
let task_low__id = "low_task__id_";

function changeTaskHighID() {
  return (task_high__id += "a");
}

function changeTaskLowID() {
  return (task_low__id += "b");
}

function getLogs() {
  return console.log(taskStorage);
}

function addHighPriorityTask() {
  let task__name = document.getElementById("input__high").value;
  let task__priority = "High";
  let task__status = "ToDo";
  let task__id = task_high__id;

  return taskStorage.push(
    (obj = {
      name: task__name,
      status: task__status,
      priority: task__priority,
      id: task__id,
    })
  );
}

function addLowPriorityTask() {
  let task__name = document.getElementById("input__low").value;
  let task__priority = "Low";
  let task__status = "ToDo";
  let task__id = task_low__id;

  return taskStorage.push(
    (obj = {
      name: task__name,
      status: task__status,
      priority: task__priority,
      id: task__id,
    })
  );
}

submit__high.addEventListener("click", changeTaskHighID);
submit__high.addEventListener("click", addHighPriorityTask);

submit__low.addEventListener("click", changeTaskLowID);
submit__low.addEventListener("click", addLowPriorityTask);

function getDivLocationByPriority() {
  let task = taskStorage[taskStorage.length - 1];

  let task__priority = task.priority;

  switch (task__priority) {
    case "High":
      return (task__location = document.querySelectorAll(".task_list")[0]);
    case "Low":
      return (task__location = document.querySelectorAll(".task_list")[1]);
  }
}

function getDivIdById() {
  let task = taskStorage[taskStorage.length - 1];

  return (task__id = task.id);
}

function getDivNameByName() {
  let task = taskStorage[taskStorage.length - 1];

  return (task__name = task.name);
}

function deleteTask() {
  let elem = document.querySelector(".task:hover");

  let current_element_id__in_array = this.id;
  let current_element_index__in_array = taskStorage.findIndex(
    (item) => item.id == current_element_id__in_array
  );

  return (
    elem.remove(),
    taskStorage.splice(current_element_index__in_array, 1),
    console.log(current_element_index__in_array),
    console.log(taskStorage)
  );
}

function markAsReady() {
  let area = task__location;
  let elem = area.querySelector(".task");

  let flag = elem.querySelector('[type="checkbox"]').value;

  let current__task = document.querySelector(".task:hover");

  let current_element_id__in_array = this.id;
  let current_element__in_array = taskStorage.find(
    (item) => item.id == current_element_id__in_array
  );

  let current__checkbox = document.querySelector(".check-material:hover");

  if (flag == "on") {
    return (
      (current__task.style.backgroundColor = "rgb(212, 212, 212)"),
      current__checkbox.querySelector("label:hover").remove(),
      (current__task.querySelector(".text").style.marginLeft = "40px"),
      (current_element__in_array.status = "Done"),
      console.log(current_element_id__in_array),
      console.log(taskStorage)
    );
  }
}

function createTaskDiv() {
  let input__button = document.createElement("input");
  input__button.type = "button";
  input__button.className = "delete__button";
  input__button.id = task__id;
  input__button.addEventListener("click", deleteTask);

  let delete__div = document.createElement("div");
  delete__div.className = "delete";
  delete__div.appendChild(input__button);

  let p = document.createElement("p");
  p.className = "task__text";
  p.innerHTML = task__name;

  let text__div = document.createElement("div");
  text__div.className = "text";
  text__div.appendChild(p);

  let label = document.createElement("label");
  label.setAttribute("for", task__id);

  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = task__id;
  input.addEventListener("change", markAsReady);

  let checkMaterial__div = document.createElement("div");
  checkMaterial__div.className = "check-material";
  checkMaterial__div.appendChild(input);
  checkMaterial__div.appendChild(label);

  let check__div = document.createElement("div");
  check__div.className = "check";
  check__div.appendChild(checkMaterial__div);

  let task__div = document.createElement("div");
  task__div.className = "task";
  task__div.appendChild(check__div);
  task__div.appendChild(text__div);
  task__div.appendChild(delete__div);

  return task__location.prepend(task__div);
}

function render() {
  getDivLocationByPriority(),
    getDivIdById(),
    getDivNameByName(),
    createTaskDiv(),
    getLogs();
}

submit__high.addEventListener("click", render);
submit__low.addEventListener("click", render);

function clear() {
  return location.reload();
}

clear__button.addEventListener("click", clear);
