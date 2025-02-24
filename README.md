# Threads

I recreated the Threads application to improve my web development skills, particularly focusing on **React** and **Next.js**.

![banner](https://i.imgur.com/1Sf8kDF.jpeg)

## ⚒️ Tech Stack

- For the frontend, I used **React** and **Next.js** to build a dynamic server-rendered application, with **Tailwind CSS** for styling and **next-themes** for dark mode support.
- For authentication, I integrated **next-auth** to handle user sign-ins securely.
- For the database, I chose **MongoDB**, and I used **bcrypt** to encrypt passwords.
- To enhance user experience, I implemented **react-toastify** for notifications.
- The entire project is written in **TypeScript** for better type safety and maintainability.

## 🚀 Getting Started

Make sure you have [Node.js](https://nodejs.org/en/download) v18.18 or later installed.

1. Clone this repository

```bash
git clone https://github.com/extrymes/Threads.git
cd Threads
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file containing the required environment variables (see below)

```bash
touch .env
```

4. Build and run the project

```bash
npm run build
npm start
```

## 🔑 Environment Variables

These keys are necessary for the project and must be declared as environment variables in the `.env` file.

<table>
    <thead>
        <tr>
            <th>Variable name</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>MONGODB_CLIENT</code></td>
            <td>The MongoDB connection string (take a look at <a href="https://mongodb.com/docs/manual/reference/connection-string">MongoDB Manual</a>).</td>
        </tr>
        <tr>
            <td><code>MONGODB_DATABASE</code></td>
            <td>The name of the database to connect to.</td>
        </tr>
        <tr>
            <td><code>NEXTAUTH_SECRET</code></td>
            <td>A random string used to hash tokens, sign/encrypt cookies and generate cryptographic keys.</td>
        </tr>
        <tr>
            <td><code>NEXTAUTH_URL</code></td>
            <td>The canonical URL of the site (e.g. http://localhost:3000 for local development).</td>
        </tr>
    </tbody>
</table>

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

This project is released under the [MIT License](https://github.com/extrymes/Threads/blob/main/LICENSE).
