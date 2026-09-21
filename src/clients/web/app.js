const tasks = [
    {
        id: 1,
        name: "Learn Java",
        deadline: "25/09/2026",
        priority: 4,
        description: "Study Java OOP and collections",
        status: "Waiting"
    },
    {
        id: 2,
        name: "Finish To-Do List",
        deadline: "30/09/2026",
        priority: 5,
        description: "Finish the frontend of the project",
        status: "Waiting"
    },
    {
        id: 3,
        name: "Buy milk",
        deadline: "20/09/2026",
        priority: 2,
        description: "Buy milk at the supermarket",
        status: "Finished"
    }
];

const taskList = document.querySelector(".task-list");
const taskDetails = document.querySelector(".task-details");
const addButton = document .querySelector(".add-task");
const filter = document.querySelector(".filter");
const searchInput = document.querySelector(".search input");

function displayTask(task){
    const taskElement = document.createElement("article");
    
    taskElement.classList.add("task");

    taskElement.innerHTML = `
        <div class="task-main">

            <h2>${task.name}</h2>

                <div>
                    <span>${task.deadline}</span>
                    <input type="checkbox"
                        class="task-status"
                        ${task.status === "Finished" ? "checked" : ""}
>
                </div>
        </div>

        <div class="task-actions">

                    <span>Priority: ${task.priority}</span>

                    <button class="show-details">👁</button>
                    <button class="edit-task">✏️</button>
                    <button class="delete-task">🗑️</button>

        </div>
    `;
    const statusCheckbox = taskElement.querySelector(".task-status");

    statusCheckbox.addEventListener("change", () => {

    if (statusCheckbox.checked) {
        task.status = "Finished";
    } else {
        task.status = "Waiting";
    }

    displayTasks();
});
    const detailsButton = taskElement.querySelector(".show-details");

    detailsButton.addEventListener("click", () => {
        showTaskDetails(task);
    });

    const editButton = taskElement.querySelector(".edit-task");
    editButton.addEventListener("click", () => {
    editTask(task);
    });

    const deleteButton = taskElement.querySelector(".delete-task");
    deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
    });

        taskList.appendChild(taskElement);

    
}
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        displayTask(task);
    });
}
function showTaskDetails(task){
    taskDetails.innerHTML = `
        <h2>Task Details</h2>

        <div class="detail">

            <h3>Name</h3>
            <p>${task.name}</p>

            <h3>Deadline</h3>
            <p>${task.deadline}</p>

            <h3>Priority</h3>
            <p>${task.priority}</p>

            <h3>Description</h3>
            <p>${task.description}</p>

            <h3>Status</h3>
            <p>${task.status}</p>

        </div>
    `;
}

function editTask(task) {

    taskDetails.innerHTML = `
        <h2>Edit Task</h2>

        <form class="edit-form">

            <label>
                Name
                <input type="text" name="name" value="${task.name}">
            </label>

            <label>
                Deadline
                <input type="date" name="deadline" value="${task.deadline}">
            </label>

            <label>
                Priority
                <input type="number" name="priority" value="${task.priority}">
            </label>

            <label>
                Description
                <textarea name="description">${task.description}</textarea>
            </label>

            <button type="submit">Save</button>

        </form>
    `;

const form = taskDetails.querySelector(".edit-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    task.name = formData.get("name");
    task.deadline = formData.get("deadline");
    task.priority = Number(formData.get("priority"));
    task.description = formData.get("description");
    displayTasks();

    taskDetails.innerHTML = `
        <h2>Task Details</h2>

        <div class="detail">
            <h3>Name</h3>
            <p>${task.name}</p>

            <h3>Deadline</h3>
            <p>${task.deadline}</p>

            <h3>Priority</h3>
            <p>${task.priority}</p>

            <h3>Description</h3>
            <p>${task.description}</p>

            <h3>Status</h3>
            <p>${task.status}</p>
        </div>
    `;
});
}

function deleteTask(id) {
    const index = tasks.findIndex(task=> task.id === id);
    if (index!== -1){
        tasks.splice(index, 1);
    }
    displayTasks();
}

addButton.addEventListener("click", () => {
    showAddForm();}
);

filter.addEventListener("change", () => {

    const filterValue = filter.value;

    if (filterValue === "") {
        displayTasks();
        return;
    }

    let filteredTasks;

    if (filterValue === "priority") {
        filteredTasks = [...tasks].sort(
            (a, b) => b.priority - a.priority
        );
    }

    if (filterValue === "deadline") {
        filteredTasks = [...tasks].sort(
            (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
    }

    if (filterValue === "status") {
        filteredTasks = tasks.filter(
            task => task.status === "Waiting"
        );
    }

    displayFilteredTasks(filteredTasks);
});

searchInput.addEventListener("input", () => {

    const searchValue = searchInput.value.toLowerCase().trim();

    const results = tasks.filter(task =>
        task.name.toLowerCase().includes(searchValue)
    );

    displayFilteredTasks(results);
});

function displayFilteredTasks(filteredTasks) {

    taskList.innerHTML = "";

    filteredTasks.forEach(task => {
        displayTask(task);
    });
}
function showAddForm() {
    taskDetails.innerHTML = `
    <h2>Add Task</h2>

        <form class="add-form">

            <label>
                Name
                <input type="text" name="name" required>
            </label>

            <label>
                Deadline
                <input type="date" name="deadline">
            </label>

            <label>
                Priority
                <input type="number" name="priority" min="1">
            </label>

            <label>
                Description
                <textarea name="description"></textarea>
            </label>

            <button type="submit">Add Task</button>

        </form>
        `;
        const form = taskDetails.querySelector(".add-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            const newTask = {
                id: Date.now(),
                name: formData.get("name"),
                deadline: formData.get("deadline"),
                priority: Number(formData.get("priority")) || 1,
                description: formData.get("description"),
                status: "Waiting"
            };
            tasks.push(newTask);
            displayTasks();

            showTaskDetails(newTask);
        });
}

displayTasks()