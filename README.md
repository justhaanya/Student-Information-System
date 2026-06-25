# Student Information System (CRUD Application)

A simple and responsive Student Information System built with HTML, CSS, JavaScript, PHP, and MySQL. The application allows users to manage student records through a clean CRUD workflow using a MySQL database.

## Features

- Add student records
- View all students
- Update student information
- Delete student records
- MySQL database integration
- Responsive UI
- PHP backend with prepared statements for database write operations

## Technologies Used

- HTML
- CSS
- JavaScript
- Bootstrap
- PHP
- MySQL
- XAMPP

## Screenshots

Add project screenshots in the `screenshots` folder.

Suggested screenshots:

- Student Details form
- Student Data table
- Add or update confirmation
- Delete confirmation flow

## Live Demo

A frontend-only (localStorage) live demo is available at:  
[https://justhaanya.github.io/Student-Information-System/](https://justhaanya.github.io/Student-Information-System/)

> **Note:** The live demo is a GitHub Pages version using browser local storage because GitHub Pages cannot host PHP/MySQL backends. The source code in the root directory still contains the full PHP + MySQL implementation.

## Database Setup

The database backup is available at:

```text
database/student_crud.sql
```

To import the database:

1. Open XAMPP Control Panel.
2. Start Apache and MySQL.
3. Open phpMyAdmin at `http://localhost/phpmyadmin`.
4. Create a database named `student_crud` if it does not already exist.
5. Import `database/student_crud.sql`.
6. Confirm the `students` table is created.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/Student-Information-System.git
```

2. Move the project folder to XAMPP `htdocs`:

```text
C:\xampp\htdocs\Student-Information-System
```

3. Import the database file:

```text
database/student_crud.sql
```

4. Start Apache and MySQL from XAMPP.

5. Open the project in your browser:

```text
http://localhost/Student-Information-System/
```

## How to Run Locally

1. Place the project folder inside `C:\xampp\htdocs`.
2. Start Apache and MySQL in XAMPP.
3. Import `database/student_crud.sql` using phpMyAdmin.
4. Check the local database settings in `db.php`.
5. Visit `http://localhost/student_crud/` in a browser.

Default local database configuration:

```php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'student_crud';
```

For deployment, configure these environment variables on your hosting provider if supported:

```text
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
```

## Folder Structure

```text
student_crud/
├── database/
│   └── student_crud.sql
├── screenshots/
│   └── .gitkeep
├── create.php
├── db.php
├── delete.php
├── index.html
├── read.php
├── script.js
├── update.php
├── .gitignore
└── README.md
```

## Future Improvements

- Add user authentication for admin access
- Add search and filter options for student records
- Add pagination for large datasets
- Add form validation for roll number format
- Add export options for CSV or PDF reports
- Add a dedicated hosted production database configuration

## Project Status

Completed and ready for portfolio, GitHub, and PHP/MySQL hosting deployment.
