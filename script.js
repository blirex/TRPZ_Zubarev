let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks(){
let list = document.getElementById("taskList");
list.innerHTML="";

tasks.forEach((task,index)=>{

if(currentFilter === "active" && task.completed) return;
if(currentFilter === "completed" && !task.completed) return;

let li = document.createElement("li");

if(task.completed) li.classList.add("completed");
li.innerHTML = `
<span onclick="toggleTask(${index})">${task.text}</span>
<button class="delete" onclick="deleteTask(${index})">X</button>
`;
list.appendChild(li);
});
updateCounter();
}
function addTask(){
let input=document.getElementById("taskInput");
if(input.value.trim()==="") return;
tasks.push({
text:input.value,
completed:false
});
input.value="";
saveTasks();
renderTasks();
}

function deleteTask(index){
tasks.splice(index,1);
saveTasks();
renderTasks();
}

function toggleTask(index){
tasks[index].completed = !tasks[index].completed;
saveTasks();
renderTasks();
}

function filterTasks(type){
currentFilter = type;
renderTasks();
}

function updateCounter(){
let counter=document.getElementById("taskCounter");
let active = tasks.filter(t=>!t.completed).length;
counter.textContent = active + " tasks remaining";
}

document.getElementById("taskInput").addEventListener("keypress", function(event) {

if(event.key === "Enter"){
addTask();
}

});
renderTasks();