# MERN Project Starter CLI

This Command Line Interface (CLI) scaffolds a complete MERN stack (MongoDB, Express.js, React, Node.js) project. It generates separate, pre-configured client and server directories to accelerate your development workflow.

---

### Features

#### Client (React + Vite)

- **Vite Tooling:** High-performance frontend tooling with a fast development server and Hot Module Replacement (HMR).
- **Core Libraries:** Pre-installed with React Router, TanStack Query, and Axios for state management and data fetching.
- **Styling:** Integrated with Tailwind CSS and DaisyUI for rapid, utility-first UI development.
- **Code Quality:** Configured with Prettier and the official Tailwind CSS plugin for consistent code formatting.
- **Folder Structure:** Organized with a scalable, feature-based directory structure.

#### Server (Express.js)

- **Express Boilerplate:** A ready-to-use server with CORS and `dotenv` pre-configured.
- **Live Reloading:** `nodemon` is included for automatic server restarts during development.
- **Database Ready:** Includes drivers and setup blocks for both MongoDB and Firebase Admin.
- **Deployment Ready:** Pre-configured for deployment on Vercel with an included `vercel.json` file.

---

### Prerequisites

- Node.js (v18 or later)
- npm

---

### Getting Started

1.  **Obtain the Script**

    - Clone the repository or download the `cli.js` file.

2.  **Install CLI Dependencies**

    - In your terminal, navigate to the script's directory and run:

    ```bash
    npm install
    ```

    - This installs `inquirer` and `chalk` for the interactive prompts.

3.  **Execute the CLI**
    - Run the script with the following command:
    ```bash
    node cli.js
    ```
    - Follow the prompts to specify the names for your client and server directories.

---

### Project Structure

#### Client Directory (`client/`)

````

client/
├── src/
│   ├── API/            \# API service files (e.g., Axios instances)
│   ├── Auth/           \# Authentication components & logic
│   ├── Components/     \# Reusable UI components
│   ├── Firebase/       \# Firebase configuration
│   ├── Hooks/          \# Custom React hooks
│   ├── Layouts/        \# Main page layout components
│   ├── Router/         \# React Router configuration
│   └── index.css       \# Global styles with Tailwind CSS & DaisyUI
├── .prettierrc.json    \# Prettier configuration
├── package.json        \# Client dependencies and scripts
└── vite.config.js      \# Vite configuration

```

#### Server Directory (`server/`)
```

server/
├── index.js            \# Main Express server entry point
├── .env                \# Environment variables (PORT, MONGO\_URI)
├── vercel.json         \# Vercel deployment configuration
└── package.json        \# Server dependencies and scripts

```

---

### Available Scripts

#### Client
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Creates a production build of the application.
- `npm run format`: Formats code with Prettier.
- `npm run lint`: Lints the codebase with ESLint.
- `npm run preview`: Previews the production build locally.

#### Server
- `npm start`: Starts the Express server with `nodemon`.

---

### Configuration

#### MongoDB Connection
1.  In `server/index.js`, uncomment the MongoDB client setup block.
2.  In the `server/.env` file, set your connection string: `MONGO_URI=your_mongo_connection_string_here`.

---

### Deployment

The **server** is pre-configured for deployment to Vercel. Push the `server` directory to a Git repository and link it to a new Vercel project.

The **client** can be deployed to any static hosting provider such as Vercel, Netlify, or Firebase Hosting.

---

### Contributing

Contributions are welcome. Please feel free to open an issue or submit a pull request.

### License

This project is licensed under the MIT License.

````
