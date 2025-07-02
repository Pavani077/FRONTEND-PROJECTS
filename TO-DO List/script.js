const inputBox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

console.log(listcontainer);

document.getElementById("add-btn").addEventListener("click", addTask);

// Add event listener for Enter key press
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  if (inputBox.value.trim() === "") {
    alert("You must enter something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    // Create span element with Font Awesome trash icon class
    let span = document.createElement("span");
    span.classList.add("fa-solid", "fa-trash");

    li.appendChild(span);
    listcontainer.appendChild(li);

    inputBox.value = ""; // Clear input box
    saveData();
  }
}

function saveData() {
  localStorage.setItem("data", listcontainer.innerHTML);
}

listcontainer.addEventListener("click", (e) => {
  if (e.target.tagName.toUpperCase() === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    saveData();
  }
});

function showTask() {
  const data = localStorage.getItem("data");
  if (data) {
    listcontainer.innerHTML = data;
  }
}

showTask();