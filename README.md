## 👋 Project Overview
Briefly describing the Kanban Board and the tech stack (React, Node.js, Tailwind, MongoDB/etc). It features JWT authentication and full CRUD capabilities.

### 🚀 Getting Started
Prerequisites: Node.js version, npm/yarn.

Installation: ```bash git clone https://github.com/Shivom76/Kanban-Board.git npm install

Environment Variables: PORT, DB-URL, MY_SECRET.

### 🛠 Tech Stack & Security
Highlight the "Security Practices" criteria:

Authentication: JWT (JSON Web Tokens) stored in LocalStorage/Cookies.

Passwords: Hashed using bcrypt.

Validation: Middleware used to protect private routes.

### 📈 Production Scaling Strategy

State Management: Moving from local useState to Redux Toolkit or TanStack Query (React Query) for better caching and server-state sync.

Architecture: Implementing a Service Layer pattern to separate API calls from UI components.

Security: Moving JWTs to HttpOnly Cookies to prevent XSS attacks.

Performance: Implementing Code Splitting (React.lazy) and Memoization to handle hundreds of tasks without lag.




#### API Documentations

POST	   /api/auth/register	     Create a new user
POST	   /api/auth/login	         Get JWT token
GET	       /api/todos	            Fetch all tasks	     Authentication Required (Bearer Token)
PATCH  	   /api/todos/update/:id	Update task status	     Authentication Required 
DELETE  	/api/todos/del/:id	    Remove a task	     Authentication Required 