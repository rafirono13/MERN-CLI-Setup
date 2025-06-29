// cli.js
// Rafi's Project Generator CLI (Final Upgrade v4.0 - Server Start Script Optimized!)
// Run this with: `node cli.js` from ANY folder
// Make sure to run `npm install inquirer chalk` before using

import fs from "fs";
import path from "path";
import { exec } from "child_process";
import child_process from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";

const log = console.log;

const createFolder = (base, name) => {
  const fullPath = path.join(base, name);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
};

const runCommand = (cmd, cwd) => {
  return new Promise((resolve, reject) => {
    log(chalk.gray(`Running command: ${cmd} in ${cwd}`));

    const process = child_process.spawn(cmd, [], {
      cwd: cwd,
      stdio: "inherit",
      shell: true,
    });

    process.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          `Command "${cmd}" exited with code ${code}. Check the output above for details.`
        );
      }
    });

    process.on("error", (err) => {
      reject(`Failed to start command "${cmd}": ${err.message}`);
    });
  });
};

// --- CLIENT GENERATOR (UPDATED WITH FIXES) ---
const generateClient = async (folder) => {
  log(chalk.cyan(`\nCreating React Vite client in ${folder}...`));

  await new Promise((resolve, reject) => {
    const viteCommand = `npm create vite@latest -- ${folder} --template react`;
    log(chalk.gray(`Spawning: ${viteCommand}`));

    const viteProcess = child_process.spawn(viteCommand, [], {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: true,
    });
    viteProcess.on("exit", (code) =>
      code === 0 ? resolve() : reject(`Vite creation exited with code ${code}.`)
    );
    viteProcess.on("error", (err) =>
      reject(`Failed to start Vite creation: ${err.message}`)
    );
  });

  const clientProjectPath = path.join(process.cwd(), folder);

  log(chalk.gray(`Installing client dependencies in ${clientProjectPath}...`));
  await runCommand(
    `npm install react-router react-icons sweetalert2 @tanstack/react-query axios firebase tailwindcss@latest @tailwindcss/vite@latest daisyui@latest prettier prettier-plugin-tailwindcss`,
    clientProjectPath
  );

  const srcPath = path.join(clientProjectPath, "src");

  // FIX 2: Added "Layouts" folder to structure
  const folderStructure = [
    "API",
    "Assets",
    "Auth",
    "Components/Common",
    "Components/Custom",
    "Components/Error",
    "Components/Private",
    "Firebase",
    "Hooks",
    "Layouts",
    "Router",
  ];
  folderStructure.forEach((dir) => createFolder(srcPath, dir));
  log(chalk.green("✅ Custom folder structure created."));

  // FIX 3: Add .prettierrc.json
  const prettierConfig = `{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./src/index.css",
  "tailwindAttributes": ["className", "class"],
  "tailwindFunctions": ["clsx", "cn", "cva", "tw"],
  "tailwindPreserveWhitespace": false,
  "tailwindPreserveDuplicates": false
}`;
  fs.writeFileSync(
    path.join(clientProjectPath, ".prettierrc.json"),
    prettierConfig
  );
  log(chalk.green("✅ .prettierrc.json added."));

  // FIX 4: Update package.json scripts
  log(chalk.gray(`Updating client package.json scripts...`));
  const packageJsonPath = path.join(clientProjectPath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.scripts = {
    dev: "vite",
    build: "vite build",
    format: "prettier --write 'src/**/*.{js,jsx,ts,tsx,json,css,md,html}'",
    "format:check":
      "prettier --check 'src/**/*.{js,jsx,ts,tsx,json,css,md,html}'",
    lint: "eslint .",
    "lint:fix":
      "eslint . --fix && prettier --write 'src/**/*.{js,jsx,ts,tsx,json,css,md,html}'",
    preview: "vite preview",
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  log(chalk.green("✅ Client package.json scripts updated."));

  const viteConfig = `import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
});`;
  fs.writeFileSync(path.join(clientProjectPath, "vite.config.js"), viteConfig);

  const routerJsx = `import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello this is the home page</h1>,
  },
]);

export default router;`;
  fs.writeFileSync(path.join(srcPath, "Router", "router.jsx"), routerJsx);

  const mainJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './Router/router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);`;
  fs.writeFileSync(path.join(srcPath, "main.jsx"), mainJsx);

  const indexCss = `@import "tailwindcss";
@plugin "daisyui";
/* Your global styles go here! */`;
  fs.writeFileSync(path.join(clientProjectPath, "src", "index.css"), indexCss);

  const filesToClean = ["App.css", "App.jsx", "assets/react.svg"];
  filesToClean.forEach((file) => {
    const filePath = path.join(srcPath, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  log(chalk.green("✅ Client setup complete."));
};

// --- SERVER GENERATOR (NO CHANGES - SCRIPTS ALREADY CORRECT) ---
const generateServer = async (folder) => {
  log(chalk.cyan(`\nCreating Express backend in ${folder}...`));
  const serverProjectPath = path.join(process.cwd(), folder);
  createFolder(process.cwd(), folder);

  await runCommand(`npm init -y`, serverProjectPath);

  await runCommand(
    `npm install express cors dotenv firebase-admin mongodb`,
    serverProjectPath
  );
  await runCommand(`npm install --save-dev nodemon eslint`, serverProjectPath);

  log(
    chalk.gray(
      `Skipping full ESLint configuration (but 'eslint' package is installed).`
    )
  );

  log(chalk.gray(`Adding dev scripts to server/package.json...`));
  const packageJsonPath = path.join(serverProjectPath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.main = "index.js";
  // FIX 1: Scripts are already correct as requested
  packageJson.scripts = {
    start: "nodemon index.js",
    test: 'echo "Error: no test specified" && exit 1',
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  log(chalk.green("✅ Dev scripts added."));

  const indexJs = `const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

/* // ------------------ MONGODB SETUP (Cmd+K, Cmd+U to uncomment) ------------------

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect(); // Connect to MongoDB on startup

    // --- Start Your API Endpoints Here ---
    
    // Example: app.get('/users', async (req, res) => { ... });

    // --- End Your API Endpoints Here ---

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// -------------------------------------------------------------------------- 
*/


app.get('/', (req, res) => {
  res.send('API Server is running...');
});

app.listen(port, () => {
  console.log(\`Server is running on port: \${port}\`);
});
`;

  fs.writeFileSync(path.join(serverProjectPath, "index.js"), indexJs);

  fs.writeFileSync(
    path.join(serverProjectPath, ".env"),
    "PORT=5000\nMONGO_URI=your_mongo_connection_string_here\n"
  );

  const vercelConfig = `{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}`;
  fs.writeFileSync(path.join(serverProjectPath, "vercel.json"), vercelConfig);
  log(chalk.green("✅ vercel.json added to server folder."));

  log(chalk.green("✅ Server setup complete."));
};

// --- MAIN EXECUTION (NO CHANGES) ---
(async () => {
  log(chalk.red.bold("✨ Rafi's Dev Starter CLI ✨"));

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "clientName",
      message: "What is the name of the client-side folder?",
      default: "client",
    },
    {
      type: "input",
      name: "serverName",
      message: "What is the name of the server-side folder?",
      default: "server",
    },
  ]);

  await generateClient(answers.clientName);
  await generateServer(answers.serverName);

  log(
    chalk.bgGreen.black("\n🚀 Project setup complete! You are ready to build.")
  );
})();
