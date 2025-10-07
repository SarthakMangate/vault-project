# Vault Project

A secure password vault web application built with **Next.js**, **MongoDB Atlas**, **JWT authentication**, and a **password generator**. Users can sign up, login, generate strong passwords, and store their vault items securely.

---

## Features

- User signup and login with **JWT authentication**
- Add, update, and delete vault items
- Generate strong passwords with options:
  - Include/exclude numbers
  - Include/exclude symbols
  - Exclude look-alike characters
- Auto-copy generated password to clipboard
- Vault items are encrypted (stored as JSON in MongoDB)
- Responsive UI with a glassmorphic design

---

## Tech Stack

- Frontend: Next.js, React
- Backend: Node.js API Routes
- Database: MongoDB Atlas
- Authentication: JWT
- Styling: CSS, Glassmorphic UI
- Deployment: Vercel

---

## Getting Started (Local Development)

### 1. Clone the repository
- git clone <your-repo-url>
- cd vault-demo

 
### 2. Install dependencies
- npm install

### 3. Create environment variables
- Create a .env.local file in the project root:

    - MONGO_URI=<Your MongoDB Atlas connection string>
    - JWT_SECRET=<Your secret key for JWT>


Example:
- MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/vault-demo?retryWrites=true&w=majority
- JWT_SECRET=mySuperSecretKey123


- Note: Do NOT commit .env.local to GitHub. It is included in .gitignore.

### 4. Run the development server
- npm run dev


- Open http://localhost:3000 in your browser.

- Deployment (Vercel)

Push your code to GitHub.

Go to Vercel and import your repository.

- Add environment variables in Vercel:

    - MONGO_URI → Your MongoDB Atlas URI

    - JWT_SECRET → Your JWT secret key

    - Deploy the project.

    - Your app will be live at the Vercel domain.


### 5.How to Run
1. Start the development server
- npm run dev


2. Open http://localhost:3000 in your browser.

3. Signup / Login with email and password (JWT is used for authentication).

4. Use Password Generator to create strong passwords:

    - Click “Generate Password”

    - Password auto-copied to clipboard

    - Optional: click “Clear Clipboard” to remove it

5. Add Vault Items:

    - Enter Title, Username, Password, and URL

    - Click Save Vault → data is stored in MongoDB

6. Refresh / Logout & Login → vault items persist

7. Optional: Check MongoDB Atlas to see encrypted vault items stored per user.
