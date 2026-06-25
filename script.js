// Fetch Students from Database
function loadStudents() {
    fetch("read.php")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showAlert(data.error, "danger");
                return;
            }

            const studentList = document.querySelector("#student-list");
            studentList.innerHTML = "";

            data.forEach((student, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${student.first_name}</td>
                    <td>${student.last_name}</td>
                    <td>${student.roll_no}</td>
                    <td>${student.class}</td>
                    <td>
                        <button class="btn btn-info btn-sm edit" data-id="${student.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete" data-id="${student.id}">Delete</button>
                    </td>
                `;
                studentList.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error loading students:", error);
            showAlert("Error loading students from server.", "danger");
        });
}

// Handle Form Submission (Add or Update Student)
document.querySelector("#student-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.querySelector("#student-form").dataset.id;

    const student = {
        first_name: document.querySelector("#firstName").value.trim(),
        last_name: document.querySelector("#lastName").value.trim(),
        roll_no: document.querySelector("#rollNo").value.trim(),
        class: document.querySelector("#studentClass").value,
        id: id
    };

    if (!student.first_name || !student.last_name || !student.roll_no || !student.class) {
        showAlert("All fields are required!", "danger");
        return;
    }

    const url = id ? "update.php" : "create.php";

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(student),
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();

        if (result.error) {
            showAlert(result.error, "danger");
        } else {
            showAlert(result.message, "success");
            loadStudents();
            clearFields();
            // Redirect to the Student Data section
            document.querySelector("#formSection").style.display = "none";
            document.querySelector("#tableSection").style.display = "block";
        }
    } catch (error) {
        showAlert("Error connecting to the server.", "danger");
        console.error(error);
    }
});

// Handle Edit Button Click
document.querySelector("#student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        const id = e.target.getAttribute("data-id");

        fetch("read.php")
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showAlert(data.error, "danger");
                    return;
                }

                const student = data.find(s => s.id == id);
                if (student) {
                    document.querySelector("#firstName").value = student.first_name;
                    document.querySelector("#lastName").value = student.last_name;
                    document.querySelector("#rollNo").value = student.roll_no;
                    document.querySelector("#studentClass").value = student.class;
                    document.querySelector("#student-form").dataset.id = id;

                    document.querySelector("#formSection").style.display = "block";
                    document.querySelector("#tableSection").style.display = "none";
                }
            })
            .catch(error => {
                showAlert("Error loading student details.", "danger");
                console.error(error);
            });
    }
});

// Handle Delete Button Click
document.querySelector("#student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure you want to delete this student?")) {
            const id = e.target.getAttribute("data-id");

            fetch("delete.php", {
                method: "POST",
                body: JSON.stringify({ id }),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    showAlert(result.error, "danger");
                } else {
                    showAlert(result.message, "warning");
                    loadStudents();
                }
            })
            .catch(error => {
                showAlert("Error deleting student.", "danger");
                console.error(error);
            });
        }
    }
});

// Clear Form Fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
    document.querySelector("#studentClass").value = "";
    delete document.querySelector("#student-form").dataset.id;
}

// Show Alert Message
function showAlert(message, type) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} mt-3`;
    alertDiv.textContent = message;

    const container = document.querySelector(".container");
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => alertDiv.remove(), 3000);
}

// Handle Navigation Clicks
document.querySelector("#showForm").addEventListener("click", () => {
    document.querySelector("#formSection").style.display = "block";
    document.querySelector("#tableSection").style.display = "none";
});

document.querySelector("#showTable").addEventListener("click", () => {
    document.querySelector("#formSection").style.display = "none";
    document.querySelector("#tableSection").style.display = "block";
     loadStudents();
});

// Load students on page load
document.addEventListener("DOMContentLoaded", loadStudents);