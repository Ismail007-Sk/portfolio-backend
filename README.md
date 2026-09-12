## A professional Express.js project Structure followed here..
express-backend/
├── src/
│   ├── config/
│   │   ├── env.ts
│   │   └── database.ts
│   │
│   ├── controllers/
│   │   └── project.controller.ts
│   │
│   ├── services/
│   │   └── project.service.ts
│   │
│   ├── repositories/
│   │   └── project.repository.ts
│   │
│   ├── routes/
│   │   └── project.routes.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts → Authentication
│   │   ├── validate.middleware.ts → Request validation
│   │   ├── error.middleware.ts → Global error catcher
│   │   └── notFound.middleware.ts → Handles unknown routes
│   │
│   ├── schemas/
│   │   └── project.schema.ts
│   │
│   ├── errors/
│   │   ├── AppError.ts → Base error class
│   │   ├── ValidationError.ts → Invalid input
│   │   ├── NotFoundError.ts → Resource doesn't exist
│   │   ├── UnauthorizedError.ts → Not authenticated
│   │   ├── ConflictError.ts → Authenticated but no permission
│   │   └── ForbiddenError.ts → Duplicate/conflicting data
│   │
│   ├── lib/
│   │   ├── jwt.ts
│   │   └── helpers.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── migrations/
│   ├── 001_create_users.sql
│   ├── 002_create_projects.sql
│   └── ...
│
├── scripts/
│   └──run_migrations.ts
│
│
├── seeds/Not Needed Now
│
├── tests/Not Needed Now
│
├── .env
├── .env.example
├── package.json
└── tsconfig.json

KINDLY CHECK TypeScript Guid for More info , Very Very important.



## ExpressJs Installation (basic)(Express.js + TypeScript + Pure ESM Setup)

## 1. Create Project Folder
```bash
mkdir express-app
cd express-app
```

## 2. Initialize npm
```bash 
npm init -y
npm pkg set type=module
npm install dotenv pg 
```

Creates:

```text
express-app/
└── package.json   --> requirements.txt Created (package.json  consists more -> scripts, dependencies, metadata)
```

## 3. For Typscript support 
```bash
npm install -D typescript tsx @types/node @types/express @types/pg
npx tsc --init
```
```text
└── tsconfig.json     ← created by `tsc --init`
```

## 4. Install Express
```bash           --> node_modules/ created. It's like .venv of FastAPI
npm install express 
```

## 5. Install Nodemon (Development)(Optional)
Nodemon automatically restarts the server whenever you save changes.
```bash
npm install --save-dev nodemon
```

## 6. Create Your First File
Create an `app.ts` file.

Project structure:
```text
express-app/
├── node_modules/
├── package.json
├── package-lock.json
├── src/
    └── app.ts
```

## 6. Write Your First Express Server
```Typescript
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

## 7. Configure Scripts
Update `package.json`:
```json 
  Very Important, needs to modify based on specific project(Below are for Tyscript)
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "dev": "tsx watch src/server.ts",
    "start": "node dist/src/server.js",
    "typecheck": "tsc --noEmit -p tsconfig.json",
    "migrate": "tsx scripts/run_migrations.ts"
  }
```

## 8. Run the Server
Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 9. Open in Browser
```
http://localhost:3000
```

Output:
```
Hello Express!
```

## Final Project Structure
```text
express-app/
├── node_modules/
├── package.json
├── package-lock.json
├── tsconfig.json
├── src/
    └── app.ts
```