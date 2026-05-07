# My-Work-Flow

A full-stack To-Do application built with the MERN stack, featuring JWT authentication, protected routes, and a responsive UI.

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18 (Vite), Tailwind CSS v3 |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB Atlas (Mongoose)          |
| Auth       | JSON Web Tokens (JWT), bcryptjs   |
| HTTP       | Axios                             |

## Project Structure

```
My-Work-Flow/
├── client/                  # React + Vite frontend
│   ├── public/
│   └── src/
│       ├── api/             # Axios instance & API calls
│       ├── components/      # Reusable UI components
│       ├── context/         # Auth & Todo context providers
│       ├── hooks/           # Custom React hooks
│       ├── pages/           # Page-level components
│       └── utils/           # Helper functions
│
├── server/                  # Express backend
│   └── src/
│       ├── config/          # DB connection
│       ├── controllers/     # Route handler logic
│       ├── middleware/       # Auth middleware
│       ├── models/          # Mongoose schemas
│       └── routes/          # Express routers
│
├── .gitignore
├── package.json             # Root (concurrently scripts)
└── README.md
```

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)

### Installation

```bash
# Install all dependencies (root + client + server)
npm run install-all
```

### Environment Variables

Create `server/.env` with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Running the App

```bash
# Run both frontend and backend concurrently
npm run dev

# Run only backend
npm run server

# Run only frontend
npm run client
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

## API Endpoints

### Auth
| Method | Endpoint            | Description         | Auth Required |
|--------|---------------------|---------------------|---------------|
| POST   | /api/auth/register  | Register a new user | No            |
| POST   | /api/auth/login     | Login & get token   | No            |
| GET    | /api/auth/me        | Get current user    | Yes           |

### Todos
| Method | Endpoint             | Description         | Auth Required |
|--------|----------------------|---------------------|---------------|
| GET    | /api/todos           | Get all user todos  | Yes           |
| POST   | /api/todos           | Create a todo       | Yes           |
| PUT    | /api/todos/:id       | Update a todo       | Yes           |
| DELETE | /api/todos/:id       | Delete a todo       | Yes           |
| PATCH  | /api/todos/:id/toggle| Toggle completed    | Yes           |
