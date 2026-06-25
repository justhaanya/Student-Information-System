// Initialize local storage if empty
if (!localStorage.getItem('sis_students')) {
    const initialData = [
        { id: 1, first_name: 'Insha', last_name: 'Sayyed', roll_no: '47', class: 'Fy.Bsc.CS' },
        { id: 2, first_name: 'Roshni', last_name: 'Singh', roll_no: '54', class: 'Fy.Bsc.DS' },
        { id: 3, first_name: 'Rozena', last_name: 'Shaikh', roll_no: '43', class: 'Fy.Bsc.DS' },
        { id: 4, first_name: 'Rupa', last_name: 'Pal', roll_no: '32', class: 'Fy.Bsc.IT' },
        { id: 5, first_name: 'haanya', last_name: 'sayyed', roll_no: '22', class: 'Fy.Bsc.IT' }
    ];
    localStorage.setItem('sis_students', JSON.stringify(initialData));
}

function getStudents() {
    return JSON.parse(localStorage.getItem('sis_students')) || [];
}

function saveStudents(students) {
    localStorage.setItem('sis_students', JSON.stringify(students));
}

// Fetch Students from Database (now LocalStorage)
function loadStudents() {
    const data = getStudents();
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
}

// Handle Form Submission (Add or Update Student)
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.querySelector("#student-form").dataset.id;

    const student = {
        first_name: document.querySelector("#firstName").value.trim(),
        last_name: document.querySelector("#lastName").value.trim(),
        roll_no: document.querySelector("#rollNo").value.trim(),
        class: document.querySelector("#studentClass").value
    };

    if (!student.first_name || !student.last_name || !student.roll_no || !student.class) {
        showAlert("All fields are required!", "danger");
        return;
    }

    let students = getStudents();

    if (id) {
        // Update
        const index = students.findIndex(s => s.id == id);
        if (index !== -1) {
            students[index] = { ...student, id: parseInt(id) };
            showAlert("Student updated successfully", "success");
        }
    } else {
        // Create
        // check if roll_no exists
        if (students.some(s => s.roll_no === student.roll_no)) {
            showAlert("Roll number already exists!", "danger");
            return;
        }
        student.id = Date.now();
        students.push(student);
        showAlert("Student added successfully", "success");
    }

    saveStudents(students);
    loadStudents();
    clearFields();
    
    // Redirect to the Student Data section
    document.querySelector("#formSection").style.display = "none";
    document.querySelector("#tableSection").style.display = "block";
});

// Handle Edit Button Click
document.querySelector("#student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        const id = e.target.getAttribute("data-id");
        const students = getStudents();
        const student = students.find(s => s.id == id);
        
        if (student) {
            document.querySelector("#firstName").value = student.first_name;
            document.querySelector("#lastName").value = student.last_name;
            document.querySelector("#rollNo").value = student.roll_no;
            document.querySelector("#studentClass").value = student.class;
            document.querySelector("#student-form").dataset.id = id;

            document.querySelector("#formSection").style.display = "block";
            document.querySelector("#tableSection").style.display = "none";
        }
    }
});

// Handle Delete Button Click
document.querySelector("#student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure you want to delete this student?")) {
            const id = e.target.getAttribute("data-id");
            let students = getStudents();
            students = students.filter(s => s.id != id);
            saveStudents(students);
            
            showAlert("Student deleted successfully", "warning");
            loadStudents();
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
