# Employee Management System 👨‍💼

A full-stack web application for managing employee records with CRUD operations, search functionality, and position filtering. Built with React, Express, and SQLite.

## Features

- ✨ Create, Read, Update, and Delete employee records
- 🔍 Real-time search by employee name (debounced)
- 🎯 Filter employees by position
- ✅ Form validation with error handling
- 📱 Responsive design with Tailwind CSS
- 🧪 Comprehensive test suite with Jest and Supertest

## Tech Stack

**Frontend:**
- React (with Hooks)
- Tailwind CSS
- Axios for API calls

**Backend:**
- Node.js with Express
- SQLite database
- sqlite3 and sqlite packages

**Testing:**
- Jest
- Supertest

## Project Structure

```
.
├── backend/
│   ├── db.js                 # Database initialization
│   ├── server.js             # Express server setup
│   ├── models/
│   │   └── Employee.js       # Employee model with database queries
│   ├── routes/
│   │   └── employees.js      # Employee API routes
│   └── tests/
│       ├── setup.js          # Test configuration
│       └── employees.test.js # API tests
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   ├── api.js            # API service functions
│   │   └── components/
│   │       ├── EmployeeForm.jsx   # Form component
│   │       └── EmployeeTable.jsx  # Table component
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup and Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd employee-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Required backend dependencies:
```bash
npm install express cors sqlite3 sqlite
npm install --save-dev jest supertest
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Required frontend dependencies:
```bash
npm install react react-dom axios
npm install --save-dev tailwindcss
```

## Running the Application

### Start the Backend Server

```bash
cd backend
node server.js
```

The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will typically start on `http://localhost:5173` (Vite) or `http://localhost:3000` (Create React App)

### Access the Application

Open your browser and navigate to the frontend URL. The application should now be running with both frontend and backend connected.

## Running Tests

### Backend API Tests

```bash
cd backend
npm test
```

This will run the test suite which includes:
- Employee creation test
- Get all employees test
- Search functionality test
- Employee update test
- Employee deletion test
- Validation error handling test

### Test Coverage

The tests cover:
- All CRUD operations (Create, Read, Update, Delete)
- Search functionality
- Input validation
- Error handling for missing fields

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees?search=term` | Search employees by name |
| POST | `/api/employees` | Create a new employee |
| PUT | `/api/employees/:id` | Update an employee |
| DELETE | `/api/employees/:id` | Delete an employee |

### Request Body Example (POST/PUT)

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "position": "Developer"
}
```

## Design Choices and Assumptions

### Design Choices

1. **Database**: SQLite was chosen for simplicity and ease of setup. The database file (`employees.db`) is created automatically on first run.

2. **Search Implementation**: Implemented debouncing (300ms delay) for search to reduce unnecessary API calls and improve performance.

3. **Validation**: Both client-side and server-side validation to ensure data integrity.

4. **Position Filter**: Added a predefined list of positions (Manager, Developer, Designer, QA) for filtering. This can be extended or made dynamic based on requirements.

5. **Email Uniqueness**: The database schema enforces unique email addresses to prevent duplicate entries.

6. **Component Structure**: Separated concerns by creating dedicated components for the form and table, making the code more maintainable.

### Assumptions

1. **Single User**: The application assumes single-user usage without authentication or authorization.

2. **Position Values**: Pre-defined position values are used for the filter dropdown. In a production environment, this could be fetched from the database.

3. **Email Format**: Basic email validation using regex pattern. More sophisticated validation could be added for production use.

4. **Error Handling**: Basic error handling is implemented. Production applications would need more comprehensive error handling and logging.

5. **Database Location**: The SQLite database file is stored in the backend directory. For production, consider using environment variables for configuration.

6. **CORS**: Currently configured to allow all origins. In production, this should be restricted to specific domains.

## Future Enhancements

- Add pagination for large employee lists
- Implement user authentication and authorization
- Add bulk import/export functionality (CSV/Excel)
- Include employee profile pictures
- Add more advanced search filters (by email, date joined, etc.)
- Implement sorting functionality
- Add confirmation dialogs for delete operations
- Deploy to cloud platform (AWS, Heroku, etc.)

## Troubleshooting

**Database Connection Error**: Ensure the backend has write permissions in its directory to create the SQLite database file.

**Port Already in Use**: If port 5000 is already in use, modify the port in `server.js` and update the API base URL in the frontend `api.js` file.

**CORS Issues**: Ensure the backend CORS configuration includes the frontend URL.

## Contact

For questions or issues, please open an issue in the repository.
